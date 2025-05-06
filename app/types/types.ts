export interface IMenuItem {
  text: string;
  url: string;
}

export interface ISocials {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  threads?: string;
  twitter?: string;
  youtube?: string;
  x?: string;
  [key: string]: string | undefined;
}

export type UserInput = {
  email: string;
  phone?: string;
  username: string;
  name: string;
  image?: string;
  profession?: string;
  showPhoneInPDF?: boolean;
  showEmailInPDF?: boolean;
  city?: string;
  bio?: string;
  portfolio?: Portifolio[];
  graduation?: Graduation[]
  public?: boolean;
  pickColor?: number;
  skills?: string[];
  softSkills?: string[];
};

export type Portifolio = {
  name: string;
  url: string;
  description: string;
  technologies: string;
};

export type Graduation = {
  institution: string;
  name: string;
  year: string;
  description: string;
};
