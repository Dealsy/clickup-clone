import { sql } from 'drizzle-orm'
import { index, pgTableCreator, serial, timestamp, varchar, integer } from 'drizzle-orm/pg-core'

export const createTable = pgTableCreator(name => `clickup_clone_${name}`)

export const posts = createTable(
  'post',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true }),
  },
  example => ({
    nameIndex: index('name_idx').on(example.name),
  }),
)

export const boardGroup = createTable('board_group', {
  id: serial('id').primaryKey(),
  statusName: varchar('status_name', { length: 256 }),
  boardColour: varchar('board_colour', { length: 256 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }),
})

export const sprint = createTable('sprint', {
  id: serial('id').primaryKey(),
  sprintName: varchar('sprint_name', { length: 256 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }),
})

export const task = createTable('task', {
  id: serial('id').primaryKey(),
  taskName: varchar('task_name', { length: 256 }),
  // sprintId: integer("sprint_id").references(() => sprint.id),
  boardGroupId: integer('board_group_id').references(() => boardGroup.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }),
})
