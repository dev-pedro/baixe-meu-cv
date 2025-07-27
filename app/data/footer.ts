import { IMenuItem, ISocials } from '@/app/types/types';

export const footerDetails: {
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  socials: ISocials;
} = {
  subheading: 'Um currículo elegante online.',
  quickLinks: [
    {
      text: 'Funcionalidades',
      url: '#features',
    },
    {
      text: 'Preços',
      url: '#pricing',
    },
    {
      text: 'Testemunhos',
      url: '#testimonials',
    },
  ],
  email: 'taxconferencepro@gmail.com',
  telephone: '',
  socials: {
    // github: 'https://github.com',
    // x: 'https://twitter.com/x',
    // twitter: 'https://twitter.com/Twitter',
    // facebook: 'https://facebook.com',
    // linkedin: 'https://www.linkedin.com',
    // youtube: 'http://www.youtube.com/@baixemeucv',
    // threads: 'https://www.threads.net',
    // instagram: 'https://www.instagram.com',
  },
};
