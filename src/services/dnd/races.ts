export interface Race {
  name: string;
  abilityScoreIncrease: {
    [key: string]: number;  // STR, DEX, CON, INT, WIS, CHA
  };
  speed: number;
  traits: string[];
  languages: string[];
  subraces?: Race[];
}

export const races: Race[] = [
  {
    name: "Dwarf",
    abilityScoreIncrease: {
      CON: 2
    },
    speed: 25,
    traits: [
      "Darkvision",
      "Dwarven Resilience",
      "Dwarven Combat Training",
      "Tool Proficiency",
      "Stonecunning"
    ],
    languages: ["Common", "Dwarvish"],
    subraces: [
      {
        name: "Hill Dwarf",
        abilityScoreIncrease: {
          WIS: 1
        },
        speed: 25,
        traits: ["Dwarven Toughness"],
        languages: []
      },
      {
        name: "Mountain Dwarf",
        abilityScoreIncrease: {
          STR: 2
        },
        speed: 25,
        traits: ["Dwarven Armor Training"],
        languages: []
      }
    ]
  }
  // Add other races following the same structure
];