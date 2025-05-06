import { LuScrollText } from "react-icons/lu";

export const siteDetails = {
    siteName: 'Baixe Meu CV',
    siteUrl: '#',
    email: 'baixemeucv@gmail.com',
    metadata: {
        title: 'Baixe Meu CV',
        description: 'Um currículo simples e elegante.',
    },
    language: 'pt-br',
    locale: 'pt-BR',
    siteLogo: `${process.env.BASE_PATH || ''}/images/logo.png`, // or use a string for the logo e.g. "TechStartup"
    siteIcon: LuScrollText,
    googleAnalyticsId: '', // e.g. G-XXXXXXX,
}