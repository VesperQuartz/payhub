DROP INDEX "products_category_unique";--> statement-breakpoint
DROP INDEX "reviews_wallet_address_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `reviews` ALTER COLUMN "ratings" TO "ratings" integer NOT NULL DEFAULT 1;--> statement-breakpoint
CREATE UNIQUE INDEX `products_category_unique` ON `products` (`category`);--> statement-breakpoint
CREATE UNIQUE INDEX `reviews_wallet_address_unique` ON `reviews` (`wallet_address`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);