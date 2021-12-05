export type Character = {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
};

export type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  length: string;
  crew: string;
};

export type GameCardType = Character | Starship;
