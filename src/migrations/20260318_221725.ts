import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_articles_content_type" AS ENUM('article', 'short-form');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__articles_v_version_content_type" AS ENUM('article', 'short-form');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "content_type" "enum_articles_content_type" DEFAULT 'article';
    ALTER TABLE "_articles_v" ADD COLUMN IF NOT EXISTS "version_content_type" "enum__articles_v_version_content_type" DEFAULT 'article';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "articles" DROP COLUMN IF EXISTS "content_type";
    ALTER TABLE "_articles_v" DROP COLUMN IF EXISTS "version_content_type";

    DO $$ BEGIN
      DROP TYPE "public"."enum_articles_content_type";
    EXCEPTION WHEN undefined_object THEN null;
    END $$;

    DO $$ BEGIN
      DROP TYPE "public"."enum__articles_v_version_content_type";
    EXCEPTION WHEN undefined_object THEN null;
    END $$;
  `)
}