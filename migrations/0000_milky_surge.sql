CREATE TYPE "public"."patient_type" AS ENUM('new', 'existing');--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "appointments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"status" varchar(20) DEFAULT 'scheduled' NOT NULL,
	"patient_type" "patient_type" DEFAULT 'new' NOT NULL,
	"has_referral" boolean DEFAULT false NOT NULL,
	"referring_doctor" varchar(255),
	"has_medical_auth" boolean DEFAULT false NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "availability" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "availability_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" date NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"reason" text,
	"start_time" time,
	"end_time" time,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(20),
	"address" text,
	"medical_history" text,
	"emergency_contact" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "appointment_date_idx" ON "appointments" USING btree ("date");--> statement-breakpoint
CREATE INDEX "appointment_user_idx" ON "appointments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "availability_date_idx" ON "availability" USING btree ("date");