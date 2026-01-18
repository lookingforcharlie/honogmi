import { Hono } from 'hono'
import { getIndex } from '../handlers/index'

const indexRoute = new Hono()
  .get('/', getIndex)

export { indexRoute }
