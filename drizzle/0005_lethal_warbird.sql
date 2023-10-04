DO $$ BEGIN
 CREATE TYPE "icon" AS ENUM('cart', 'transport', 'home', 'food', 'health', 'entertainment', 'education', 'clothes', 'sport', 'money', 'gift', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "icon" "icon" DEFAULT 'other' NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "is_recurring";