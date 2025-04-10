ALTER TABLE "startalyze_user" ADD COLUMN "first_name" text;--> statement-breakpoint
ALTER TABLE "startalyze_user" ADD COLUMN "last_name" text;--> statement-breakpoint
ALTER TABLE "startalyze_user" ADD COLUMN "onboarding_completed" boolean;--> statement-breakpoint
ALTER TABLE "startalyze_user" ADD COLUMN "plan" text DEFAULT 'free' NOT NULL;