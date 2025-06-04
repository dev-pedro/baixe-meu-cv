import { DataCreateCurriculoForm } from '@/app/types/types';
import { curriculoExample } from '../app/data/curriculo-example/curriculo.example';
import { createOrUpdateUser } from '@/lib/user';

async function seed() {

  const curriculoExampleTyped: DataCreateCurriculoForm = curriculoExample;

  await createOrUpdateUser(curriculoExampleTyped);

  console.log('Seed concluído!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    console.log('Finalizando o processo de seed...');
    process.exit(0);
  });
