export function readText(value: unknown, name: string, max: number): string {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max) {
    throw new Error(`${name} is required and must be at most ${max} characters.`);
  }
  return value.trim();
}
export function validateContact(value: unknown) {
  if (!value || typeof value !== "object") throw new Error("Invalid contact form.");
  const data = value as Record<string, unknown>;
  const name = readText(data.name, "Name", 100);
  const email = readText(data.email, "Email", 254);
  const subject = readText(data.subject, "Subject", 150);
  const message = readText(data.message, "Message", 5000);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(name + email + subject)) {
    throw new Error("Please enter valid contact details.");
  }
  return { name, email, subject, message };
}
