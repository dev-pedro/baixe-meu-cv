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
      id?: number | null | undefined;
      name?: string | null | undefined;
      url?: string | null | undefined;
      description?: string | null | undefined;
      technologies?: string[] | null | undefined;
      userId?: number | null | undefined;
    }
  | [];

export type Graduation =
  | {
      id?: number | null | undefined;
      name?: string | null | undefined;
      institution?: string | null | undefined;
      description?: string | null | undefined;
      year?: string | null | undefined;
      userId?: number | null | undefined;
    }
  | [];

export type Job =
  | {
      id: number | null | undefined;
      function?: string | null | undefined;
      description?: string | null | undefined;
      start?: string | null | undefined;
      end?: string | null | undefined;
    }
  | [];

export type Experience =
  | {
      id: number | null | undefined;
      name?: string | null | undefined;
      company?: string | null | undefined;
      start?: string | null | undefined;
      end?: string | null | undefined;
      jobs?: Job[] | [];
      userId?: number | null | undefined;
    }
  | [];

export type Course =
  | {
      id: number | null | undefined;
      institution?: string | null | undefined;
      name?: string | null | undefined;
      year?: string | null | undefined;
      description?: string | null | undefined;
      online?: boolean | null | undefined;
      userId?: number | null | undefined;
    }
  | [];
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
};

export type UserDataForm = {
  profile: DataCreateCurriculoForm;
  message: string | null | undefined;
  error: boolean | false;
} | null;
