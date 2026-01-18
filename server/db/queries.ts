import { db } from './db'
import { todoTable } from './schema'
import { desc } from 'drizzle-orm'

type Todo = {
  id: number
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export const getTodos = async () => {
  const todos = await db
    .select()
    .from(todoTable)
    .orderBy(desc(todoTable.createdAt))
  return todos
}

export const createTodo = async (todo: { title: string }) => {
  const newTodo = await db.insert(todoTable).values(todo)
  return newTodo
}
