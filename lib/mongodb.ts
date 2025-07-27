// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';
import { logger } from './logger';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  if (!uri || !dbName) {
    logger.error('MONGODB_URI e MONGODB_DB devem estar definidos no .env.local');
    throw new Error('MONGODB_URI e MONGODB_DB devem estar definidos no .env.local');
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
      });

      await client.connect();
      const db = client.db(dbName);

      cachedClient = client;
      cachedDb = db;

      logger.info(`Conectado ao MongoDB na tentativa ${attempt}.`);
      return db;
    } catch (error: any) {
      logger.warn(
        `Erro ao conectar ao MongoDB (tentativa ${attempt}/${MAX_RETRIES}): ${
          error?.message || error
        }`
      );

      if (attempt < MAX_RETRIES) {
        logger.info(`Nova tentativa em ${RETRY_DELAY_MS / 1000} segundos...`);
        await delay(RETRY_DELAY_MS);
      } else {
        logger.error('Todas as tentativas de conexão com o MongoDB falharam.');
        throw new Error('Erro de conexão com o banco de dados após múltiplas tentativas.');
      }
    }
  }

  throw new Error('Erro inesperado ao tentar conectar ao banco de dados.');
}
