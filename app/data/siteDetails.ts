import { LuScrollText } from "react-icons/lu";

export const siteDetails = {
    siteName: 'Curriculo on-line',
    siteUrl: '#',
    email: 'taxconferencepro@gmail.com',
    metadata: {
        title: 'Curriculo on-line',
        description: 'Um currículo simples e elegante.',
    },
    language: 'pt-br',
    locale: 'pt-BR',
    siteLogo: `${process.env.BASE_PATH || ''}/images/logo.png`, // or use a string for the logo e.g. "TechStartup"
    siteIcon: LuScrollText,
    googleAnalyticsId: '', // e.g. G-XXXXXXX,
}