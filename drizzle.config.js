import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  // out: './drizzle',
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_xWXbDodgl9R5@ep-quiet-bar-a8w02oz1-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
});