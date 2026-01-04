import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/charlie/')({
  component: CharlieIndex,
})

export default function CharlieIndex() {
  return <div>Charlie rocks! its good</div>
}
