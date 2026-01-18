import { Hono } from 'hono'
import { indexRoute } from './routes/index'
import { todosRoute } from './routes/todos'

const app = new Hono()

const router = app
  .route('/', indexRoute)
  .route('/api/todos', todosRoute)

// implementing RPC pattern for the backend server
export type AppType = typeof router
export default app
