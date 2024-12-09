export interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
}

export interface Foundation {
  id: string;
  name: string;
  description: string;
}

export interface Funeral {
  id: string;
  deceasedName: string;
  date: Date;
  location: string;
  details: string;
}

export type Language = 'tr' | 'en' | 'hy';

export type Theme = 'light' | 'dark';