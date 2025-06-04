import { join } from 'path';
import { readFileSync } from 'fs';
import { PortfolioCategory, PortfolioTag } from '@/lib/generated/prisma';

const imagePath = join(__dirname, '../../data/curriculo-example/image-perfil/perfil.png');
const imageBuffer = readFileSync(imagePath);
const imageBase64 = imageBuffer.toString('base64');

export const curriculoExample = {
  username: 'curriculo-example',
  name: 'Pedro Henrique',
  email: 'pedro.coder@gmail.com',
  image: `data:image/png;base64,${imageBase64}`,
  profession: 'Analista de Qualidade Pleno',
  phone: '19994513631',
  showPhoneInPDF: true,
  city: 'Hortolândia, SP',
  bio: 'Entusiasta de tecnologia com foco em desenvolvimento web e aprendizado constante.',
  public: true,
  pickColor: 5,
  portfolio: [
    {
      name: 'Siscomex Json Validation',
      url: 'https://siscomex-json-validation.vercel.app/',
      description:
        'Validação de arquivos JSON do Siscomex, consulta de atributos por NCM e mais, com interface intuitiva e fácil de usar. O projeto foi desenvolvido utilizando React, Next.js e Tailwind CSS.',
      tags: ['OUTRA'],
      customTags: ['Node.Js', 'Next.js', 'Tailwind CSS', 'Vercel', 'TypeScript'],
      category: 'OUTRA',
      customCategory: 'WEB APP',
    },
    {
      name: 'Baixe Meu CV',
      url: 'https://baixemeucv.com.br/',
      description:
        'Baixe Meu CV, desenvolvido com Next.js, TypeScript e Tailwind CSS. Permite que os usuários criem e compartilhem seus currículos de forma simples e rápida.',
      tags: [PortfolioTag.OUTRA],
      customTags: ['Node.Js', 'Next.js', 'Tailwind CSS', 'Vercel', 'TypeScript', 'PostgreSQL'],
      category: PortfolioCategory.OUTRA,
      customCategory: 'WEB APP',
    },
  ],
  graduation: [
    {
      institution: 'Facudade Anhanguera Campinas',
      name: 'Tecnologia em Análise e Desenvoolvimento de Sistemas',
      year: '2015',
      description:
        'Ao longo da graduação em Desenvolvimento de Sistemas, foram adquiridas competências essenciais em lógica de programação, algoritmos e estruturas de dados, com foco na resolução de problemas computacionais. A formação abrangeu também programação orientada a objetos, desenvolvimento web (front-end e back-end), modelagem e manipulação de bancos de dados relacionais e não relacionais. Além dos conhecimentos técnicos, foram exploradas práticas de engenharia de software, testes, versionamento com Git e segurança da informação. A utilização de metodologias ágeis como Scrum e Kanban favoreceu o trabalho em equipe e a organização de projetos. Projetos integradores e estágios supervisionados proporcionaram experiência prática e aproximaram os aprendizados acadêmicos das demandas do mercado.',
      online: false,
    },
  ],
  experiences: [
    {
      company: 'Honda Automóveis do Brasil',
      start: '2003',
      end: '2011',
      jobs: [
        {
          function: 'Team Leader',
          description:
            'Atuei como Team Leader, liderando equipe na linha de produção, garantindo qualidade, segurança e eficiência. Fui responsável pela organização de tarefas, treinamento de operadores, resolução de problemas operacionais e apoio às práticas de melhoria contínua no processo produtivo, entre outras atividades.',
          start: '2007',
          end: '2011',
        },
        {
          function: 'Operador de Máquinas',
          description:
            'Na função de Operador de Máquinas de Usinagem, realizando setup, ajuste e operação de equipamentos para fabricação de peças, seguindo rigorosamente os padrões de qualidade e segurança. Fui responsável pela interpretação de desenhos técnicos, controle de medidas e manutenção preventiva básica das máquinas.',
          start: '2005',
          end: '2007',
        },
        {
          function: 'Montador',
          description:
            'Cmo Montador na linha de montagem de automóveis, executando a instalação de componentes e conjuntos conforme padrões técnicos e de qualidade. Fui responsável por seguir instruções de trabalho, utilizar ferramentas específicas e garantir a segurança e eficiência no processo produtivo.',
          start: '2003',
          end: '2005',
        },
      ],
    },
    {
      company: 'GM dos Reis Indústria e Comércio Ltda',
      start: '2012',
      end: '2017',
      jobs: [
        {
          function: 'Ferramenteiro',
          description:
            'Na função de Ferramenteiro realizando a fabricação, ajuste e manutenção de dispositivos, ferramentas e moldes utilizados na produção. Fui responsável por interpretar desenhos técnicos, operar máquinas de usinagem e garantir a precisão e qualidade dos componentes.',
          start: '2014',
          end: '2017',
        },
        {
          function: 'Analista de Processos',
          description:
            'Atuei como Analista de Processos, desenvolvendo, padronizando e otimizando processos produtivos. Fui responsável pela elaboração de instruções de trabalho, acompanhamento no processo produtivo, análise de indicadores, implementação de melhorias e suporte técnico às áreas de produção e qualidade.',
          start: '2012',
          end: '2014',
        },
      ],
    },
    {
      company: 'Medical H7 - Soluções Médicas',
      start: '2018',
      end: '2023',
      jobs: [
        {
          function: 'Sócio Fundador',
          description:
            'Estando Sócio Fundador da company Medical H7 - Soluções Médicas, participei da criação, estruturação e gestão do negócio. Fui responsável pelo desenvolvimento de estratégias comerciais, relacionamento com clientes, coordenação de equipes técnicas e garantia da qualidade dos serviços prestados.',
          start: '2018',
          end: '2023',
        },
        {
          function: 'Técnico Mecânico e Eletrônico',
          description:
            'Como Técnico Mecânico e Eletrônico em equipamentos cirúrgicos, realizando diagnóstico, reparo e calibração de dispositivos, entre outras atividades. Fui responsável por interpretar esquemas técnicos, substituir componentes, realizar testes de funcionalidade e assegurar a conformidade com normas de qualidade e segurança.',
          start: '2018',
          end: '2023',
        },
      ],
    },
    {
      company: 'Grupo Assist',
      start: '2024',
      end: 'Atual',
      jobs: [
        {
          function: 'Analista de Suporte e Treinamento',
          description:
            'Responsável pela gestão de chamados, suporte técnico e elaboração de materiais de treinamento, assegurando que os usuários recebam o suporte necessário para utilizar de forma eficiente as soluções desenvolvidas.',
          start: '2024',
          end: '2025',
        },
        {
          function: 'Analista de Qualidade Pleno (QA)',
          description:
            'Estruturação e implementação de estratégias de qualidade no desenvolvimento da plataforma Classist. Criação de testes automatizados e validação contínua das entregas para garantir estabilidade e redução de falhas nas novas funcionalidades. Definição de critérios de aceitação em conjunto com o Tech Lead e equipe de desenvolvimento, visando diminuir bugs em produção e aumentar a confiabilidade da plataforma. Promoção de uma cultura de qualidade na equipe, com práticas como testes regressivos, testes de carga e automação de processos. Atuação focada na redução de retrabalho e aceleração do ciclo de desenvolvimento.',
          start: '2025',
          end: 'Atual',
        },
      ],
    },
  ],
  courses: [
    {
      institution: 'Senai',
      name: 'TWI - Ensino correto de um trabalho - Fase I e II',
      year: '2011',
      description:
        'Curso TWI – Ensino Correto de um Trabalho (Fase I e II) realizado no SENAI, com foco no desenvolvimento de habilidades para padronizar, instruir e treinar colaboradores de forma eficiente, entre outras atividades. Aprendi técnicas de desdobramento de tarefas, elaboração de instruções claras, acompanhamento de desempenho e aplicação de métodos para garantir a qualidade, segurança e produtividade no ambiente de trabalho.',
      online: false,
    },
    {
      institution: 'Heller Máquinas Operatrizes',
      name: 'Programação CNC',
      year: '2007',
      description:
        'Curso de Programação CNC, com foco na criação e otimização de programas para máquinas de comando numérico computadorizado. Aprendi a interpretar desenhos técnicos, definir estratégias de usinagem, elaborar códigos G e M, ajustar parâmetros de corte e garantir a precisão e eficiência dos processos produtivos.',
      online: false,
    },
  ],

  skills: [
    'Tecnologias de desenvolvimento Web',
    'Banco de Dados',
    'Git e GitHub',
    'Softwares CAD',
    'Softwares de Edição de Imagem e Vídeo',
    'Gestão de Projetos',
    'Análise de Dados',
    'Metodologias Ágeis (Scrum, Kanban)',
    'Comunicação Interpessoal',
    'Resolução de Problemas',
    'Liderança e Motivação de Equipe',
    'Normas de Qualidade e Segurança',
    'Lean Manufacturing e Kaizen',
  ],
  softSkills: [
    'Comunicação',
    'Trabalho em Equipe',
    'Segurança no Trabalho',
    'Resolução de Problemas',
    'Adaptabilidade',
    'Pensamento Crítico e Analítico',
    'Gestão do Tempo',
    'Empatia e Inteligência Emocional',
    'Criatividade e Inovação',
    'Liderança',
    'Organização e Planejamento Estratégico',
    'Proatividade e Iniciativa',
  ],
};
