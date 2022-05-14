// @ts-check

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import run from '../src/application.js';

let listsContainer, addListInput, addListBtn;
let tasksContainer, addTaskInput, addTaskBtn;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();

  listsContainer = document.querySelector('[data-container="lists"]');
  addListInput = document.querySelector('[data-testid="add-list-input"]');
  addListBtn = document.querySelector('[data-testid="add-list-button"]');

  tasksContainer = document.querySelector('[data-container="tasks"]');
  addTaskInput = document.querySelector('[data-testid="add-task-input"]');
  addTaskBtn = document.querySelector('[data-testid="add-task-button"]');
});

describe('Initial state', () => {
  it('there is only one default list', () => {
    expect(listsContainer).toBeInTheDocument();
    expect(listsContainer.querySelectorAll('li')).toHaveLength(1);
    expect(listsContainer).toHaveTextContent('General');
  });

  it('there are no tasks', () => {
    expect(tasksContainer).toBeInTheDocument();
    expect(tasksContainer).toBeEmptyDOMElement();
  });
});

it('New task is added to the default list', () => {
  const testTaskValue = 'Test task';
  addTaskInput.value = testTaskValue;
  addTaskBtn.click();
  const listName = listsContainer.querySelector('b').innerHTML;
  expect(listName).toBe('General');
  expect(tasksContainer.querySelectorAll('li')).toHaveLength(1);
  expect(tasksContainer).toHaveTextContent(testTaskValue);
});

it('After new task added, it is dislpayed in the list and input is erased', () => {
  const testTaskValue = 'Test task';
  addTaskInput.value = testTaskValue;
  addTaskBtn.click();
  expect(addTaskInput).toHaveTextContent('');
  expect(tasksContainer).toHaveTextContent(testTaskValue);
});

it('Can add two tasks to the default list', () => {
  const fistTaskValue = 'First test task';
  const secondTaskValue = 'Second test task';
  addTaskInput.value = fistTaskValue;
  addTaskBtn.click();
  addTaskInput.value = secondTaskValue;
  addTaskBtn.click();
  const listName = listsContainer.querySelector('b').innerHTML;
  expect(listName).toBe('General');
  expect(tasksContainer.querySelectorAll('li')).toHaveLength(2);
  expect(tasksContainer).toHaveTextContent(fistTaskValue);
  expect(tasksContainer).toHaveTextContent(secondTaskValue);
});

it('Can add a second list. Both lists display their tasks correctly', () => {
  const defaultListFistTaskValue = 'First test task';
  const defaultListSecondTaskValue = 'Second test task';
  const secondListValue = 'Second list';
  const secondListFistTaskValue = 'First task in second list';
  addTaskInput.value = defaultListFistTaskValue;
  addTaskBtn.click();
  addTaskInput.value = defaultListSecondTaskValue;
  addTaskBtn.click();
  addListInput.value = secondListValue;
  addListBtn.click();
  listsContainer.querySelector(`[data-testid="${secondListValue.toLowerCase()}-list-item"]`).click();
  addTaskInput.value = secondListFistTaskValue;
  addTaskBtn.click();
  expect(tasksContainer.querySelectorAll('li')).toHaveLength(1);
  expect(tasksContainer).toHaveTextContent(secondListFistTaskValue);
  listsContainer.querySelector('[data-testid="general-list-item"]').click();
  expect(tasksContainer.querySelectorAll('li')).toHaveLength(2);
  expect(tasksContainer).toHaveTextContent(defaultListFistTaskValue);
  expect(tasksContainer).toHaveTextContent(defaultListSecondTaskValue);
});
