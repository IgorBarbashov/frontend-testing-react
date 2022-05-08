// @ts-check
/* eslint-disable no-undef */

const port = 8080;
const host = 'localhost';
const appUrl = `http://${host}:${port}`;

describe('Simple blog', () => {
  const newTaskInputSelector = '[data-testid="task-name-input"]';
  const newTaskAddBtnelector = '[data-testid="add-task-button"]';
  const removeTaskBtnelector = '[data-testid^="remove-task-"]';
  const taskSelector = 'li';

  beforeEach(async () => {
    await page.goto(appUrl);
  });

  it('app runs with input and submit button', async () => {
    await expect(page).toMatchElement(newTaskInputSelector);
    await expect(page).toMatchElement(newTaskAddBtnelector);
  });

  it('new tasks can be added', async () => {
    const beforeTasksCount = (await page.$$(taskSelector)).length;

    await expect(page).toFill(newTaskInputSelector, 'Create mock service');
    const isBtnDisabled = await page.$eval(newTaskAddBtnelector, el => el.disabled);
    expect(isBtnDisabled).toBeFalsy();
    await expect(page).toClick(newTaskAddBtnelector);
    await expect(page).toMatch('Create mock service');

    const afterTasksCount = (await page.$$(taskSelector)).length;
    expect(afterTasksCount).toBe(beforeTasksCount + 1);
  });

  it('tasks can be removed adds', async () => {
    const beforeTasksCount = (await page.$$(taskSelector)).length;

    await expect(page).toFill(newTaskInputSelector, 'Create mock service');
    await expect(page).toClick(newTaskAddBtnelector);
    await expect(page).toFill(newTaskInputSelector, 'Test mock service');
    await expect(page).toClick(newTaskAddBtnelector);
    await expect(page).toMatch('Test mock service');

    await expect(page).toClick(removeTaskBtnelector);
    await expect(page).toMatchElement(newTaskInputSelector);

    const afterTasksCount = (await page.$$(taskSelector)).length;
    expect(afterTasksCount).toBe(beforeTasksCount + 1);
  });
});
