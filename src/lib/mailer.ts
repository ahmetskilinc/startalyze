import { Resend } from "resend";
import { env } from "./env";

export const mailer = new Resend(env.MAILER_API_KEY);
