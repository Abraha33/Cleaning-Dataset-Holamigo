-- Align "User" with prisma/schema.prisma (fixes P2022: column passwordHash does not exist).
-- Handles: legacy column "password" renamed to "passwordHash", or column missing entirely.

DO $$
BEGIN
  IF to_regclass('public."User"') IS NULL THEN
    -- Base de datos vacía o sin esta tabla: usa `pnpm db:ready` (db push + seed) o crea el esquema antes.
    RETURN;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'User'
      AND column_name = 'password'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'User'
      AND column_name = 'passwordHash'
  ) THEN
    ALTER TABLE "User" RENAME COLUMN "password" TO "passwordHash";
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'User'
      AND column_name = 'passwordHash'
  ) THEN
    ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT;
    -- bcrypt hash for placeholder password "changeme" (seed overwrites demo user)
    UPDATE "User"
    SET "passwordHash" = '$2b$12$Pxvx.URdEK2z2GbZ9/uQk.FF/tT3PUF82ydAQcNsKhCe1.QM1epBy'
    WHERE "passwordHash" IS NULL;
    ALTER TABLE "User" ALTER COLUMN "passwordHash" SET NOT NULL;
  END IF;
END $$;
