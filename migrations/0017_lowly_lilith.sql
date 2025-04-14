DROP INDEX "reviews_wallet_address_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `products` ALTER COLUMN "category" TO "category" text NOT NULL DEFAULT 'general';--> statement-breakpoint
CREATE UNIQUE INDEX `reviews_wallet_address_unique` ON `reviews` (`wallet_address`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);