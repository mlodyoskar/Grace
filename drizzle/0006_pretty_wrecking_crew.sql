DO $$ BEGIN
 CREATE TYPE "color" AS ENUM('red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'gray', 'black', 'brown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "icon" ADD VALUE 'salary';--> statement-breakpoint
ALTER TYPE "icon" ADD VALUE 'travel';--> statement-breakpoint
ALTER TYPE "icon" ADD VALUE 'book';--> statement-breakpoint
ALTER TYPE "icon" ADD VALUE 'electronic';--> statement-breakpoint
ALTER TYPE "icon" ADD VALUE 'tool';--> statement-breakpoint
ALTER TYPE "icon" ADD VALUE 'furniture';--> statement-breakpoint
ALTER TYPE "icon" ADD VALUE 'car';--> statement-breakpoint
ALTER TYPE "icon" ADD VALUE 'party';--> statement-breakpoint
ALTER TYPE "icon" ADD VALUE 'coffe';--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "color" "color" DEFAULT 'red' NOT NULL;