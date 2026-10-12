import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | undefined;

export async function sendAlert(
  subject: string,
  text: string,
  replyTo?: string,
) {
  const user = process.env.GMAIL_USER;
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (!user || !appPassword) {
    throw new Error(
      "Email alerts are not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.",
    );
  }

  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass: appPassword,
    },
  });

  await transporter.sendMail({
    from: user,
    to: user,
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
  });
}
