ALTER TABLE `transactions` ADD `tx_hash` text NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `role`;