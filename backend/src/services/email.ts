import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendNoteEmailParams {
  to: string;
  noteTitle: string;
  noteContent: string;
}

export const sendNoteCreatedEmail = async ({
  to,
  noteTitle,
  noteContent,
}: SendNoteEmailParams): Promise<void> => {
  if (!process.env.RESEND_API_KEY) {
    console.log("Email skipped: RESEND_API_KEY not configured");
    return;
  }

  try {
    await resend.emails.send({
      from: "Lead Notes <noreply@gksagar.online>",
      to: [to],
      subject: `New Note Created: ${noteTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">📝 New Note Created!</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">${noteTitle}</h3>
            <p style="color: #666; white-space: pre-wrap;">${noteContent}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            This email was sent from Lead Notes App.
          </p>
        </div>
      `,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    // Don't throw - email failure shouldn't break note creation
  }
};
