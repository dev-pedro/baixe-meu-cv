import { PortfolioCategory, PortfolioTag } from '@/lib/generated/prisma';

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

export type UserPromisseResult = {
  emailHash: string | null | undefined;
  emailEncrypted: string | null | undefined;
  phoneEncrypted: string | null | undefined;
  username: string | null | undefined;
  name: string | null | undefined;
  image?: string | null | undefined;
  profession?: string | null | undefined;
  showPhoneInPDF?: boolean | false;
  showEmailInPDF?: boolean | false;
  city?: string | null | undefined;
  bio?: string | null | undefined;
  portfolio?: Portfolio[] | [];
  graduation?: Graduation[] | [];
  public?: boolean | false;
  pickColor?: number | null | undefined;
  skills?: string[] | [];
  softSkills?: string[] | [];
} | null;

export type UserSession = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | null;

export type Portfolio = {
  id?: number | undefined | null;
  name?: string | null;
  url?: string | undefined | null;
  description?: string | null;
  tags?: PortfolioTag[] | undefined;
  customTags?: string[] | undefined;
  category?: PortfolioCategory | null | undefined;
  customCategory?: string | null;
  userId?: number;
};

export type Graduation = {
  id?: number | undefined | null;
  name?: string | null | undefined;
  institution?: string | null | undefined;
  description?: string | null | undefined;
  online?: boolean | null | undefined;
  year?: string | null | undefined;
  userId?: number;
};

export type Job = {
  id?: number | undefined | null;
  function?: string | null | undefined;
  description?: string | null | undefined;
  start?: string | null | undefined;
  end?: string | null | undefined;
  experienceId?: number;
};

export type Experience = {
  id?: number | undefined | null;
  company?: string | null | undefined;
  start?: string | null | undefined;
  end?: string | null | undefined;
  jobs?: Job[];
  userId?: number;
};

export type Course = {
  id?: number | undefined | null;
  institution?: string | null | undefined;
  name?: string | null | undefined;
  year?: string | null | undefined;
  description?: string | null | undefined;
  online?: boolean;
  userId?: number;
};
export type DataCreateCurriculoForm = {
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  bio?: string;
  pickColor?: number;
  profession?: string;
  city?: string;
  showPhoneInPDF: boolean;
  showEmailInPDF: boolean;
  public: boolean;
  template?: string;
  portfolio?: Portfolio[] | [];
  graduation?: Graduation[] | [];
  experiences?: Experience[] | [];
  courses?: Course[] | [];
  skills?: string[] | [];
  softSkills?: string[] | [];
} | null | undefined;

export type DataCreateOrUpdateUser = {
  username?: string;
  name?: string;
  emailEncrypted?: string;
  phoneEncrypted?: string;
  image?: string;
  bio?: string;
  pickColor?: number;
  profession?: string;
  city?: string;
  showPhoneInPDF: boolean;
  showEmailInPDF: boolean;
  public: boolean;
  template?: string;
  portfolio?: Portfolio[] | [];
  graduation?: Graduation[] | [];
  experiences?: Experience[] | [];
  courses?: Course[] | [];
  skills?: string[] | [];
  softSkills?: string[] | [];
};

export type UserDataResult = {
  profile: DataCreateCurriculoForm;
  message: string | null | undefined;
  error: boolean | false;
} | null;

export type UserDataForm = {
  profile: DataCreateCurriculoForm;
  message: string | null | undefined;
  error: boolean | false;
} | null;

export type Props = {
  params: Promise<{
    find_person: string;
    profile: DataCreateCurriculoForm;
  }>;
};

export type SectionProps = {
  profile: DataCreateCurriculoForm;
  userSession: UserSession | null;
};

export type UserContextType = {
  dataProfile: UserDataResult | null;
  setProfile: React.Dispatch<React.SetStateAction<UserDataResult | null>>;
  loading: boolean;
};
