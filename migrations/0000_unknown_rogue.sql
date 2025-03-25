CREATE TABLE `users` (
	`wallet_address` text PRIMARY KEY NOT NULL,
	`business_name` text,
	`email` text,
	`role` text NOT NULL,
	`updated_at` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);