import type { Context } from 'hono'

export const getIndex = (c: Context) => {
  return c.json({ message: 'Hello Hono!' })
}
