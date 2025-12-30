import { z } from "zod/v4";

export const fightFormSchema = z
  .object({
    partner: z.string(),
    date: z.string().min(1, "Date is required"),
    name: z.string(),
    whatHappened: z.string(),
    myPov: z.string(),
    perceivedPartnerPov: z.string(),
    intensity: z.number().min(1).max(5),
    seriousness: z.number().min(1).max(5),
    conclusion: z.string(),
  })
  .refine((data) => data.whatHappened.trim() || data.myPov.trim(), {
    message: "Fill in either 'What happened' or 'My POV'",
    path: ["whatHappened"],
  });

export type FightFormValues = z.infer<typeof fightFormSchema>;

