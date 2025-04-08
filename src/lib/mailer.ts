import { Resend } from "resend";

export const mailer = new Resend(process.env.MAILER_API_KEY!);
