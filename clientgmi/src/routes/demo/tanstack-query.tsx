import { useCallback, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { hc } from 'hono/client'
// For implementing RPC pattern, we need to share the AppType from server to client
import type { AppType } from '../../../../server/index.ts'

// RPC: share the AppType from server to client, so we don't need to create an todo interface in the client
// equals to const client = hc<AppType>('http://localhost:5000')
const client = hc<AppType>('/')

export const Route = createFileRoute('/demo/tanstack-query')({
  component: TanStackQueryDemo,
})

// type Todo = {
//   id: number
//   name: string
// }

function TanStackQueryDemo() {
  const {
    data = [],
    refetch, // call queryFn again internally, help useQuery to refetch the data
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ['todos'],
    // queryFn: () => fetch('/api/todos').then((res) => res.json()),
    queryFn: () => client.api.todos.$get().then((res) => res.json()),
    placeholderData: [],
  })

  const isInitialLoading = isPending && data.length === 0
  const isUpdating = isFetching && !isInitialLoading

  // Destructuring Syntax: destructuring the mutate function and renaming it to addTodo
  // Renaming makes code more readable, especially when you have multiple mutations
  // const {
  //   mutate,           // The mutation function
  //   mutateAsync,      // Async version (returns a promise)
  //   isPending,        // Is the mutation running?
  //   isError,          // Did the mutation fail?
  //   isSuccess,        // Did the mutation succeed?
  //   error,            // Error object (if failed)
  //   data,             // Response data (if succeeded)
  //   reset,            // Reset the mutation state
  // } = useMutation({ ... })
  const { mutate: addTodo } = useMutation({
    mutationFn: (todo: string) =>
      fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
      }).then((res) => res.json()),
    onSuccess: () => refetch(),
  })

  const [todo, setTodo] = useState('')

  // Using useCallback Hook: Only creates new function if dependencies change
  const submitTodo = useCallback(async () => {
    console.log('submitTodo', todo)
    await addTodo(todo)
    setTodo('')
  }, [addTodo, todo])

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-linear-to-br from-red-900 via-red-800 to-black p-4 text-white"
      style={{
        backgroundImage:
          'radial-gradient(50% 50% at 80% 20%, #3B021F 0%, #7B1028 60%, #1A000A 100%)',
      }}
    >
      <div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <h1 className="text-2xl mb-4">TanStack Query Todos list</h1>
        {isInitialLoading ? (
          <div className="mb-4 bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md text-white/80">
            {'Loading todos...'}
          </div>
        ) : (
          <>
            {isUpdating ? (
              <div className="mb-3 text-sm text-white/70">{'Updating...'}</div>
            ) : null}
            <ul className="mb-4 space-y-2">
              {data.map((t) => (
                <li
                  key={t.id}
                  className="bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md"
                >
                  <span className="text-lg text-white">{t.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitTodo()
              }
            }}
            placeholder="Enter a new todo..."
            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            disabled={todo.trim().length === 0}
            onClick={submitTodo}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Add todo
          </button>
        </div>
      </div>
    </div>
  )
}
