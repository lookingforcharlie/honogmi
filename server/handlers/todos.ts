import type { Context } from 'hono'
import { getTodos, createTodo } from '../db/queries'

export const getTodosHandler = async (c: Context) => {
  try {
    const todos = await getTodos()
    return c.json(todos)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to get todos' }, 500)
  }
}
