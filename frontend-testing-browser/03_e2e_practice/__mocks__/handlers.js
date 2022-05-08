// @ts-check
import { rest } from 'msw';
import _ from 'lodash';

let tasks = [];

export const handlers = [
  rest.get('/tasks', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(tasks)
    );
  }),
  rest.post('/tasks', ({ body: { task }}, res, ctx) => {
    const newTask = { ...task, id: _.uniqueId() };
    tasks.unshift(newTask);
    return res(
      ctx.status(200),
      ctx.json(newTask)
    );
  }),
  rest.delete('/tasks/:id', ({ params: { id }}, res, ctx) => {
    tasks = tasks.filter(el => el.id !== id);
    return res(
      ctx.status(204)
    );
  })
];
