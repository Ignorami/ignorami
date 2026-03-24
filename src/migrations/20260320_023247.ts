import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false;
  ALTER TABLE "_articles_v" ADD COLUMN IF NOT EXISTS "version_featured" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" DROP COLUMN IF EXISTS "featured";
  ALTER TABLE "_articles_v" DROP COLUMN IF EXISTS "version_featured";`)
}
