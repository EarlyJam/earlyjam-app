import { callEdgeFunction } from "@/helpers/edgeFunction.ts";

export async function sendEmail(to: string, subject: string, body: string) {
  await callEdgeFunction("sendEmail", {
    body: {
      to,
      subject,
      textBody: body
    }
  });
}
