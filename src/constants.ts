export enum INIT_CARD_TITLE {
  CHARACTER = 'Character',
  RANDOM = 'Random',
  STARSHIP = 'Starship'
}

export const initCards = [
  {
    title: INIT_CARD_TITLE.CHARACTER,
    icon: 'people',
    description: 'A person with greater mass wins'
  },
  {
    title: INIT_CARD_TITLE.RANDOM,
    icon: 'question',
    description: 'Random choice between a character and a starship'
  },
  {
    title: INIT_CARD_TITLE.STARSHIP,
    icon: 'rocket',
    description: 'A starship with more crew wins'
  }
];
