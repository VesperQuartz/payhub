CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`merchant_address` text NOT NULL,
	`updated_at` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`merchant_address`) REFERENCES `business_profile`(`wallet_address`) ON UPDATE no action ON DELETE no action
);
