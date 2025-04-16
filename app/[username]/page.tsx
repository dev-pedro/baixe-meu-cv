import { getUserByUsername } from '@/lib/user';
import Header from '../components/header';
import Education from '../components/section.education';
import { user } from '../data/user.exemple';
import Experience from '../components/section.experience';
import Courses from '../components/section.courses';
import { RiEmpathizeFill } from 'react-icons/ri';
import { FaBrain } from 'react-icons/fa';

export default async function UserPage({ params }: { params: { username: string } }) {
  //const user = await getUserByUsername(params.username);
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div className="p-6 max-w-11/12 md:max-w-8/12 mx-auto space-y-8">
      <Header props={user} />

      <Education props={user} />

      <Experience props={user} />

      <Courses props={user} />

      <section>
      <div className="flex items-center mb-4">
          <FaBrain className="w-6 h-6 mr-2" />
          <h2 className="text-2xl font-semibold">Skills</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.skills?.map((skill, i) => (
            <span key={i} className="bg-primary/20 text-primary/80 px-2 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center mb-4">
          <RiEmpathizeFill className="w-8 h-8 mr-2" />
          <h2 className="text-2xl font-semibold">Soft Skills</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.softSkills?.map((skill, i) => (
            <span key={i} className="bg-primary/20 text-primary/80 px-2 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
