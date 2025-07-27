export async function getCryptoKeyFromEnvKey(envKey: string) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(envKey);
  const hash = await crypto.subtle.digest('SHA-256', keyData); // 32 bytes
  return crypto.subtle.importKey('raw', hash, 'AES-GCM', false, ['encrypt', 'decrypt']);
}
