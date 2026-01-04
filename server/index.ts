import { Hono } from 'hono'

const app = new Hono()

const router = app
  .get('/', (c) => {
    return c.json({ message: 'Hello Hono!' })
  })
  .get('/api/todos', (c) => {
    return c.json([
      { id: 1, name: 'Buy groceries from hono' },
      { id: 2, name: 'Buy mobile phone from hono' },
      { id: 3, name: 'Buy laptop from hono' },
    ])
  })

// implementing RPC pattern for the backend server
export type AppType = typeof router
export default app
