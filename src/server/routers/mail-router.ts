import { j, publicProcedure } from "../jstack";
import { mailer } from "@/lib/mailer";
import React from "react";
import { emailTemplates } from "@/components/mail";
import { mailerInputSchema } from "@/lib/zod";
import { env } from "@/lib/env";

export const mailerRouter = j.router({
  send: publicProcedure.input(mailerInputSchema).mutation(async ({ input, c }) => {
    try {
      const TemplateComponent = emailTemplates[input.template];

      if (!TemplateComponent) {
        return c.superjson({
          success: false,
          error: "Invalid template selected.",
        });
      }

      const reactComponent = React.createElement(TemplateComponent);

      const { data } = await mailer.emails.send({
        from: `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM_ADDRESS}>`,
        to: [input.to],
        subject: input.subject,
        react: reactComponent,
      });

      return c.superjson({ success: true, data });
    } catch (error) {
      return c.superjson({ success: false, error: String(error) });
    }
  }),
});
