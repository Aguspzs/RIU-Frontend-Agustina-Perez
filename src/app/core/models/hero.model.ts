export interface Hero {
  id: number;
  name: string;
  slug?: string;
  biography?: {
    alignment: string;
  };
  work?: {
    base: string;
    occupation: string;
  };
  images?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}
