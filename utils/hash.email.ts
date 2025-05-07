// utils/hash.email.ts
export async function hashEmail(email: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hashBuffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
