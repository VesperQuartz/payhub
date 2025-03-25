DROP INDEX "products_category_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `products` ALTER COLUMN "amount" TO "amount" numeric NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `products_category_unique` ON `products` (`category`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);