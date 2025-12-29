CREATE TABLE `feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`message` text NOT NULL,
	`type` text DEFAULT 'other',
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
