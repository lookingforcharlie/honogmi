import { reset, seed } from 'drizzle-seed'
import { db, pool } from '../server/db/db'
import * as schema from '../server/db/schema'

// Seed the local database with 1000 users and 1000 todos
async function seedLocalDb() {
  // Safety guard
  if (process.env.NODE_ENV === 'production') {
    throw new Error('❌ reset() must never run in production')
  }

  // Reset database (TRUNCATE tableName1, tableName2, ... CASCADE;)
  await reset(db, schema)

  // Seed database with 1000 users and 1000 todos
  await seed(db, schema, { count: 20 }).refine((f) => ({
    todoTable: {
      columns: {
        title: f.valuesFromArray({
          values: [
            'Laundry Day',
            'Buy Groceries',
            'Walk the Dog',
            'Finish Homework',
            'Call Mom',
            'Book Doctor Appointment',
            'Write Blog Post',
            'Pay Bills',
            'Read a Book',
            'Clean the Kitchen',
            'Go for a Run',
            'Plan Vacation',
            'Organize Closet',
            'Schedule Meeting',
            'Fix the Sink',
            'Reply to Emails',
            'Water the Plants',
            'Make a Presentation',
            'Renew Subscription',
            'Order Takeout',
          ],
        }),
      },
    },
  }))
}

// End the pool after seeding
seedLocalDb()
  .then(() => {
    console.log('Database seeded successfully')
    pool.end()
  })
  .catch((error) => {
    console.error('Error seeding database', error)
    pool.end()
  })
