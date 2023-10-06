ALTER TABLE "accounts" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "category_id" SET NOT NULL;