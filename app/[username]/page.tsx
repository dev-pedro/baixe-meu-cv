import { getUserByUsername } from '@/lib/user';
import Header from '../components/header';
import Education from '../components/section.education';
import { user } from '../data/user.exemple';
import Experience from '../components/section.experience';

export default async function UserPage({ params }: { params: { username: string } }) {
  //const user = await getUserByUsername(params.username);
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div className="p-6 max-w-11/12 md:max-w-8/12 mx-auto space-y-8">
      <Header props={user} />

      <Education props={user} />

      <Experience props={user} />

      

      <section>
        <h2 className="text-xl font-semibold mb-2">Cursos</h2>
        <ul className="space-y-2">
          {user.cursos?.map((curso, i) => (
            <li key={i}>
              {curso.titulo} - {curso.instituicao} ({curso.ano})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills?.map((skill, i) => (
            <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
