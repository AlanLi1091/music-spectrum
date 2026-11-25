import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {after, before, test} from 'node:test';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright';

const appUrl = process.env.MUSIC_SPECTRUM_TEST_HTML
  ? pathToFileURL(process.env.MUSIC_SPECTRUM_TEST_HTML)
  : new URL('../index.html', import.meta.url);
const records = JSON.parse(await readFile(new URL('../genres.json', import.meta.url), 'utf8'));
const axes = ['energy', 'function', 'popularity'];
const complete = record => axes.every(axis => Number.isFinite(record[axis]));
const example = records.find(complete);
const editedEnergy = (example.energy + 37) % 101;
let browser;

before(async () => {
  const channel = process.env.PLAYWRIGHT_CHANNEL;
  browser = await chromium.launch(channel ? {channel} : {});
});

after(async () => {
  await browser?.close();
});

function browserTest(name, check, options = {}) {
  test(name, {timeout: 15_000}, async (t) => {
    const context = await browser.newContext({
      acceptDownloads: true,
      offline: true,
      viewport: {width: 1280, height: 1000},
    });
    t.after(() => context.close());
    if (options.blockStorage) {
      await context.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', {
          get() { throw new DOMException('Storage disabled for the test', 'SecurityError'); },
        });
      });
    }

    const page = await context.newPage();
    page.setDefaultTimeout(3000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(appUrl.href);
    await check(page, errors);
    assert.deepEqual(errors, [], 'unexpected browser errors');
  });
}

const listed = page => page.locator('#list tr');
const recordRow = page => page.locator(`#list tr[data-id="${example.id}"]`);
const recordDot = page => page.locator(`#plot circle[data-id="${example.id}"]`);
const targetMarker = page => page.locator('#plot circle[r="10"]');

async function coordinates(locator) {
  return locator.evaluate(element => [element.getAttribute('cx'), element.getAttribute('cy')]);
}

async function editEnergy(page) {
  await recordRow(page).click();
  await page.locator('#edit0').fill(String(editedEnergy));
}

browserTest('initial file load renders records without console errors', async (page, errors) => {
  assert.equal(new URL(page.url()).protocol, 'file:');
  assert.deepEqual(errors, [], 'initial browser errors');
  assert.equal(await listed(page).count(), records.length);
  assert.equal(await page.locator('#plot circle[data-id]').count(), records.filter(complete).length);
  assert.equal(await page.locator('#save').isDisabled(), true);
});

browserTest('drag rotates the plot and reset restores the original view', async (page) => {
  const original = await coordinates(recordDot(page));
  const box = await page.locator('#plot').boundingBox();
  assert.ok(box, 'plot is visible');
  const x = box.x + box.width * 0.08;
  const y = box.y + box.height * 0.08;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + box.width * 0.25, y, {steps: 5});
  await page.mouse.up();
  assert.notDeepEqual(await coordinates(recordDot(page)), original, 'drag should move plotted records');
  await page.locator('#reset').click();
  assert.deepEqual(await coordinates(recordDot(page)), original, 'reset should restore plot coordinates');
});

for (const [index, axis] of axes.entries()) {
  browserTest(`${['EI', 'FI', 'PI'][index]} slider moves only the ${axis} target`, async (page) => {
    const original = await coordinates(targetMarker(page));
    const slider = page.locator(`#s${index}`);
    const values = await page.locator('#sliders input').evaluateAll(inputs => inputs.map(input => +input.value));
    const key = values[index] < 100 ? 'ArrowRight' : 'ArrowLeft';
    values[index] += key === 'ArrowRight' ? 1 : -1;
    await slider.press(key);
    for (const [slot, expected] of values.entries()) {
      assert.equal(await page.locator(`#v${slot}`).textContent(), String(expected), `target label ${slot}`);
    }
    assert.notDeepEqual(await coordinates(targetMarker(page)), original, 'slider should move the plot target');
    assert.equal(await page.locator('#plot text').last().textContent(), values.join(' / '));
  });
}

browserTest('search restricts the results and clearing restores them', async (page) => {
  const query = example.name.toUpperCase();
  const expected = records.filter(record =>
    `${record.name} ${record.family}`.toLowerCase().includes(query.toLowerCase()));
  assert.ok(expected.length > 0 && expected.length < records.length);
  const search = page.locator('#search');
  await search.fill(query);
  assert.deepEqual(await listed(page).evaluateAll(rows => rows.map(row => row.dataset.id)),
                   expected.map(record => record.id));
  await search.clear();
  assert.equal(await listed(page).count(), records.length);
});

browserTest('family and rating filters constrain results together', async (page) => {
  await page.locator('#family').selectOption(example.family);
  const family = records.filter(record => record.family === example.family);
  assert.ok(family.length > 0 && family.length < records.length);
  assert.deepEqual(await listed(page).evaluateAll(rows => rows.map(row => row.dataset.id)),
                   family.map(record => record.id));
  for (const status of ['rated', 'unrated']) {
    await page.locator('#status').selectOption(status);
    const expected = family.filter(record => complete(record) === (status === 'rated'));
    assert.deepEqual(await listed(page).evaluateAll(rows => rows.map(row => row.dataset.id)),
                     expected.map(record => record.id));
    assert.equal(await page.locator('#plot circle[data-id]').count(), expected.filter(complete).length);
  }
});

browserTest('selecting a record opens the editor and highlights its point', async (page) => {
  await recordRow(page).click();
  assert.equal(await page.locator('#selected').textContent(), example.name);
  assert.equal(await page.locator('#save').isEnabled(), true);
  assert.deepEqual(await page.locator('#editor input').evaluateAll(inputs => inputs.map(input => +input.value)),
                   axes.map(axis => example[axis]));
  assert.equal(await recordDot(page).getAttribute('r'), '6');
});

browserTest('a local edit survives a page reload', async (page) => {
  await editEnergy(page);
  await page.locator('#save').click();
  assert.equal(await recordRow(page).locator('td').nth(1).textContent(), String(editedEnergy));
  await page.reload();
  assert.equal(await recordRow(page).locator('td').nth(1).textContent(), String(editedEnergy));
  await recordRow(page).click();
  assert.equal(await page.locator('#edit0').inputValue(), String(editedEnergy));
  assert.match(await page.locator('#detail').textContent(), /user_estimate/);
});

browserTest('JSON export downloads the full dataset with the current edit', async (page) => {
  await editEnergy(page);
  await page.locator('#save').click();
  const [download] = await Promise.all([
    page.waitForEvent('download', {timeout: 3000}),
    page.locator('#export').click(),
  ]);
  assert.equal(download.suggestedFilename(), 'music-spectrum-data.json');
  const exported = JSON.parse(await readFile(await download.path(), 'utf8'));
  assert.deepEqual(exported, records.map(record => record.id === example.id
    ? {...record, energy: editedEnergy, status: 'user_estimate'}
    : record));
});

browserTest('blocked localStorage leaves the app usable and warns when saving', async (page) => {
  assert.equal(await listed(page).count(), records.length);
  await editEnergy(page);
  const warning = page.waitForEvent('dialog', {timeout: 3000}).then(async (dialog) => {
    const message = dialog.message();
    await dialog.dismiss();
    return message;
  });
  const [message] = await Promise.all([warning, page.locator('#save').click()]);
  assert.match(message, /导出 JSON/);
  assert.equal(await recordRow(page).locator('td').nth(1).textContent(), String(editedEnergy));
  await page.reload();
  assert.equal(await recordRow(page).locator('td').nth(1).textContent(), String(example.energy));
}, {blockStorage: true});
