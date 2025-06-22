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

export type Portfolio =
  | {
      id?: number | undefined | null;
      name?: string | null;
      url?: string | null;
      description?: string | null;
      tags?: PortfolioTag[] | undefined;
      customTags?: string[] | undefined;
      category?: PortfolioCategory | null | undefined;
      customCategory?: string | null;
      createdAt?: Date | string;
      updatedAt?: Date | string;
      userId: number;
    }
  | [];

export type Graduation =
  | {
      name?: string | null | undefined;
      institution?: string | null | undefined;
      description?: string | null | undefined;
      online?: boolean | null | undefined;
      year?: string | null | undefined;
    }
  | [];

export type Job =
  | {
      function?: string | null | undefined;
      description?: string | null | undefined;
      start?: string | null | undefined;
      end?: string | null | undefined;
    }
  | [];

export type Experience =
  | {
      company?: string | null | undefined;
      start?: string | null | undefined;
      end?: string | null | undefined;
      jobs?: Job[];
    }
  | [];

export type Course =
  | {
      institution?: string | null | undefined
      name?: string | null | undefined
      year?: string | null | undefined
      description?: string | null | undefined
      online?: boolean
    };
export type DataCreateCurriculoForm = {
  username?: string | null | undefined;
  name?: string | null | undefined;
  email: string | null | undefined;
  phone?: string | null | undefined;
  image?: string | null | undefined;
  bio?: string | null | undefined;
  pickColor?: number | null | undefined;
  profession?: string | null | undefined;
  city?: string | null | undefined;
  showPhoneInPDF?: boolean | null | undefined;
  showEmailInPDF?: boolean | null | undefined;
  public?: boolean | null | undefined;
  portfolio?: Portfolio[] | [];
  graduation?: Graduation[] | [];
  experiences?: Experience[] | [];
  courses?: Course[] | [];
  skills?: string[] | [];
  softSkills?: string[] | [];
} | null;

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

export type FindPersonProps = {
  params: {
    find_person: string;
  };
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