import { emailTemplates } from '@/components/mail';
import { j, publicProcedure } from '../jstack';
import { mailerInputSchema } from '@/lib/zod';
import { mailer } from '@/lib/mailer';
import { env } from '@/lib/env';
import React from 'react';

export const mailerRouter = j.router({
  send: publicProcedure.input(mailerInputSchema).mutation(async ({ input, c }) => {
    try {
      const TemplateComponent = emailTemplates[input.template];

      if (!TemplateComponent) {
        return c.superjson({
          success: false,
          error: 'Invalid template selected.',
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
