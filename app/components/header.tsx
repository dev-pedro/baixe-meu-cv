import { Button } from '@/components/ui/button';

export default function Header({ props }: { props: any }) {
  return (
    <section className="mb-40 md:mb-20 mt-4">
      <div className="flex justify-end w-full">
        <Button variant={'download'}>Pegue meu CV</Button>
      </div>
      <div className="flex flex-col items-center text-center pt-20">
        <img
          src={props?.image}
          alt="Imagem do usuário"
          className="w-44 md:w-xs rounded-full object-cover pb-2"
        />
        <p className="text-xl md:text-2xl pb-4">{props?.nome}</p>
        <h1 className="font-bold text-2xl md:text-5xl pb-4">{props.profissao}</h1>
        <p className='pb-6'>{props.bio}</p>
        <Button  variant={'contact'}>Contate me</Button>
      </div>
    </section>
  );
}
