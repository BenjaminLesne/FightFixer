PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_fights` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
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
--> statement-breakpoint
INSERT INTO `__new_fights`("id", "partner", "date", "name", "what_happened", "my_pov", "perceived_partner_pov", "intensity", "seriousness", "conclusion", "created_at") SELECT "id", "partner", "date", "name", "what_happened", "my_pov", "perceived_partner_pov", "intensity", "seriousness", "conclusion", "created_at" FROM `fights`;--> statement-breakpoint
DROP TABLE `fights`;--> statement-breakpoint
ALTER TABLE `__new_fights` RENAME TO `fights`;--> statement-breakpoint
PRAGMA foreign_keys=ON;