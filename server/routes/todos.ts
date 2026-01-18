import { Hono } from 'hono'
import { getTodosHandler } from '../handlers/todos'

const todosRoute = new Hono()
  .get('/', getTodosHandler)

export { todosRoute }
