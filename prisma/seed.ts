import { DataCreateCurriculoForm } from '@/app/types/types';
import { curriculoExample } from '../app/data/curriculo-example/curriculo.example';
import { createOrUpdateUser } from '@/lib/user';

async function seed() {
  const curriculoExampleTyped: DataCreateCurriculoForm = curriculoExample;

  await createOrUpdateUser(curriculoExampleTyped);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
