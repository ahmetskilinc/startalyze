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
ALTER TABLE "startalyze_chat" ADD CONSTRAINT "startalyze_chat_user_id_startalyze_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."startalyze_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "startalyze_message" ADD CONSTRAINT "startalyze_message_chat_id_startalyze_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."startalyze_chat"("id") ON DELETE cascade ON UPDATE no action;