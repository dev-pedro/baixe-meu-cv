import { getCryptoKeyFromEnvKey } from "./crypto.key.from.env.key";

export async function decryptData(encryptedBase64: string) {
  const key = process.env.ENCRYPT_KEY;
  if (!key) {
    throw new Error('Decryption key is not defined');
  }

  const encryptedBinary = atob(encryptedBase64);
  const encryptedBytes = new Uint8Array([...encryptedBinary].map((char) => char.charCodeAt(0)));

  const iv = encryptedBytes.subarray(0, 16);
  const data = encryptedBytes.subarray(16);

  const cryptoKey = await getCryptoKeyFromEnvKey(key);

  try {
    const decryptedBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, data);

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    console.error('Erro ao descriptografar:', error);
    return null;
  }
}
