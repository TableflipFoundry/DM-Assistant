export interface Background {
  name: string;
  skillProficiencies: string[];
  toolProficiencies?: string[];
  languages?: number;
  equipment: string[];
  feature: {
    name: string;
    description: string;
  };
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

export const backgrounds: Background[] = [
  {
    name: "Acolyte",
    skillProficiencies: ["Insight", "Religion"],
    languages: 2,
    equipment: [
      "A holy symbol",
      "A prayer book or prayer wheel",
      "5 sticks of incense",
      "Vestments",
      "A set of common clothes",
      "15 gp"
    ],
    feature: {
      name: "Shelter of the Faithful",
      description: "As an acolyte, you command the respect of those who share your faith..."
    },
    personalityTraits: [
      "I idolize a particular hero of my faith and constantly refer to that person's deeds and example.",
      "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace."
    ],
    ideals: [
      "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld.",
      "Charity. I always try to help those in need, no matter what the personal cost."
    ],
    bonds: [
      "I would die to recover an ancient relic of my faith that was lost long ago.",
      "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."
    ],
    flaws: [
      "I judge others harshly, and myself even more severely.",
      "I put too much trust in those who wield power within my temple's hierarchy."
    ]
  }
  // Add other backgrounds following the same structure
];