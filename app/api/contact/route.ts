import nodemailer from "nodemailer";

export const runtime = "nodejs";

type SubmittedField = {
  label?: unknown;
  inputType?: unknown;
  required?: unknown;
  value?: unknown;
};

const clean = (value: unknown, maximum: number) =>
  typeof value === "string" ? value.trim().slice(0, maximum) : "";

export async function POST(request: Request) {
  let payload: { fields?: unknown; website?: unknown };
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return Response.json({ message: "Ongeldige aanvraag." }, { status: 400 });
  }

  if (clean(payload.website, 200)) return Response.json({ success: true });
  if (
    !Array.isArray(payload.fields) ||
    payload.fields.length < 1 ||
    payload.fields.length > 15
  ) {
    return Response.json(
      { message: "Het formulier is ongeldig." },
      { status: 400 },
    );
  }

  const fields = (payload.fields as SubmittedField[]).map((field) => ({
    label: clean(field.label, 120),
    inputType: clean(field.inputType, 20),
    required: field.required === true,
    value: clean(field.value, 5000),
  }));
  const invalid = fields.some(
    (field) =>
      !field.label ||
      (field.required && !field.value) ||
      (field.inputType === "email" &&
        field.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)),
  );
  if (invalid) {
    return Response.json(
      { message: "Controleer de ingevulde gegevens en probeer het opnieuw." },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const recipient = process.env.CONTACT_EMAIL;
  if (!host || !user || !password || !recipient) {
    console.error("Contactformulier: SMTP-configuratie is onvolledig.");
    return Response.json(
      { message: "Verzenden is tijdelijk niet beschikbaar." },
      { status: 503 },
    );
  }

  const replyTo = fields.find(
    (field) => field.inputType === "email" && field.value,
  )?.value;
  const submittedSubject = fields.find(
    (field) => field.label.toLowerCase() === "onderwerp",
  )?.value;
  const subject = (submittedSubject || "Nieuw contactbericht").replace(
    /[\r\n]/g,
    " ",
  );
  const text = fields
    .map((field) => `${field.label}: ${field.value || "Niet ingevuld"}`)
    .join("\n\n");

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user, pass: password },
    });
    await transporter.sendMail({
      from: `SIRRA contactformulier <${user}>`,
      to: recipient,
      replyTo: replyTo || undefined,
      subject: `Contact via sirra.nl · ${subject}`,
      text,
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Contactformulier kon niet worden verzonden:", error);
    return Response.json(
      {
        message:
          "Het bericht kon niet worden verzonden. Probeer het later opnieuw.",
      },
      { status: 502 },
    );
  }
}
