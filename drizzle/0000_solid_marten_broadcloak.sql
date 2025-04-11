CREATE TABLE "startalyze_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "startalyze_chat" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "startalyze_message" (
	"id" text PRIMARY KEY NOT NULL,
	"chat_id" text NOT NULL,
	"content" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "startalyze_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "startalyze_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "startalyze_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"first_name" text,
	"last_name" text,
	"onboarding_completed" boolean,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "startalyze_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "startalyze_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "startalyze_account" ADD CONSTRAINT "startalyze_account_user_id_startalyze_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."startalyze_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "startalyze_chat" ADD CONSTRAINT "startalyze_chat_user_id_startalyze_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."startalyze_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "startalyze_message" ADD CONSTRAINT "startalyze_message_chat_id_startalyze_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."startalyze_chat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "startalyze_session" ADD CONSTRAINT "startalyze_session_user_id_startalyze_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."startalyze_user"("id") ON DELETE cascade ON UPDATE no action;