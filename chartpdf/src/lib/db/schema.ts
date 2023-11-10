import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

//we create a chats table. Each chat will be a single row in the db, containing
//the chat id, the chat name, its url the timestamp, the user id who created
//that chat and the file key(used to id the file from the s-tree) as the chats column
export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  pdfName: text("pdf_name").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  fileKey: text("file_key").notNull(),
});

//now we will create the messages table with each message as a row like we did with chats.
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chartId: integer("chart_id")
    .references(() => chats.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  role: userSystemEnum('role').notNull()
});
