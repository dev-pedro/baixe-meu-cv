// @utils/encrypt.data
import { getCryptoKeyFromEnvKey } from "./crypto.key.from.env.key";

export async function encryptData(data: string) {
  const key = process.env.ENCRYPT_KEY;
  if (!key) {
    throw new Error('Encryption key is not defined');
  }

  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const cryptoKey = await getCryptoKeyFromEnvKey(key);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    dataBuffer
  );

  // Prepara saída: IV + encryptedBuffer
  const combinedBuffer = new Uint8Array(iv.length + encryptedBuffer.byteLength);
  combinedBuffer.set(iv, 0);
  combinedBuffer.set(new Uint8Array(encryptedBuffer), iv.length);

  return btoa(String.fromCharCode(...combinedBuffer));
}
