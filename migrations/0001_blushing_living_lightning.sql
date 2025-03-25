CREATE TABLE `business_profile` (
	`wallet_address` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`web_url` text,
	`updated_at` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`amount` integer NOT NULL,
	`category` text,
	`stock` integer NOT NULL,
	`merchant_address` text,
	`updated_at` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`merchant_address`) REFERENCES `business_profile`(`wallet_address`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_category_unique` ON `products` (`category`);--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_name` text NOT NULL,
	`amount` integer NOT NULL,
	`status` text NOT NULL,
	`role` text NOT NULL,
	`customer_address` text NOT NULL,
	`merchant_address` text NOT NULL,
	`updated_at` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`customer_address`) REFERENCES `users`(`wallet_address`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`merchant_address`) REFERENCES `business_profile`(`wallet_address`) ON UPDATE no action ON DELETE no action
);
