import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_articles_content_type" AS ENUM('article', 'short-form');
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_articles_content_type" AS ENUM('article', 'short-form');
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__articles_v_version_content_type" AS ENUM('article', 'short-form');
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  ALTER TABLE "articles" ADD COLUMN "content_type" "enum_articles_content_type" DEFAULT 'article';
  ALTER TABLE "_articles_v" ADD COLUMN "version_content_type" "enum__articles_v_version_content_type" DEFAULT 'article';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" DROP COLUMN "content_type";
  ALTER TABLE "_articles_v" DROP COLUMN "version_content_type";
  DROP TYPE "public"."enum_articles_content_type";
  DROP TYPE "public"."enum__articles_v_version_content_type";`)
}
