CREATE TABLE "appointments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "appointments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"contact_number" varchar(20) NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"status" varchar(20) DEFAULT 'scheduled' NOT NULL,
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
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "appointment_date_idx" ON "appointments" USING btree ("date");--> statement-breakpoint
CREATE INDEX "availability_date_idx" ON "availability" USING btree ("date");