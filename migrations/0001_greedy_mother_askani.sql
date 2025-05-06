CREATE INDEX "appointment_date_idx" ON "appointments" USING btree ("date");--> statement-breakpoint
CREATE INDEX "availability_date_idx" ON "availability" USING btree ("date");