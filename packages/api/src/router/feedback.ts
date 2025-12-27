import type { TRPCRouterRecord } from "@trpc/server";
import { Resend } from "resend";
import { z } from "zod/v4";

import { publicProcedure } from "../trpc";

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const feedbackRouter = {
  create: publicProcedure
    .input(z.object({ message: z.string().min(1) }))
    .mutation(async ({ input }) => {
      try {
        const resendApiKey = getEnvVar("RESEND_API_KEY");
        const feedbackEmail = getEnvVar("FEEDBACK_EMAIL");

        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: feedbackEmail,
          subject: "Feedback from FightFixer App",
          text: input.message,
        });

        return { success: true };
      } catch (error) {
        console.error("Failed to send feedback email:", error);
        throw new Error("Failed to send feedback. Please try again later.");
      }
    }),
} satisfies TRPCRouterRecord;

