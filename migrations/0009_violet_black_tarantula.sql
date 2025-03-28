PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`review` text,
	`ratings` integer NOT NULL,
	`wallet_address` text,
	`merchant_address` text,
	`updated_at` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`wallet_address`) REFERENCES `users`(`wallet_address`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`merchant_address`) REFERENCES `business_profile`(`wallet_address`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_reviews`("id", "review", "ratings", "wallet_address", "merchant_address", "updated_at", "created_at") SELECT "id", "review", "ratings", "wallet_address", "merchant_address", "updated_at", "created_at" FROM `reviews`;--> statement-breakpoint
DROP TABLE `reviews`;--> statement-breakpoint
ALTER TABLE `__new_reviews` RENAME TO `reviews`;--> statement-breakpoint
PRAGMA foreign_keys=ON;