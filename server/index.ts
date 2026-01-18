import { Hono } from 'hono'
import { getTodos, createTodo } from './db/queries'

const app = new Hono()

const router = app
  .get('/', (c) => {
    return c.json({ message: 'Hello Hono!' })
  })
  .get('/api/todos', async (c) => {
    try {
      const todos = await getTodos()
      return c.json(todos)
    } catch (error) {
      console.error(error)
      // let client know about the error
      return c.json({ error: 'Failed to get todos' }, 500)
    }
  })

// implementing RPC pattern for the backend server
export type AppType = typeof router
export default app
