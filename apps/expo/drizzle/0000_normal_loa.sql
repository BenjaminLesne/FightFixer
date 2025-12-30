CREATE TABLE `fights` (
	`id` text PRIMARY KEY NOT NULL,
	`partner` text,
	`date` text NOT NULL,
	`name` text,
	`what_happened` text,
	`my_pov` text,
	`perceived_partner_pov` text,
	`intensity` integer,
	`seriousness` integer,
	`conclusion` text,
	`created_at` text NOT NULL
);
