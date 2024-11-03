export interface Class {
  name: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: string[];
  numSkillChoices: number;
  features: {
    [level: number]: string[];
  };
}

export const classes: Class[] = [
  {
    name: "Fighter",
    hitDie: 10,
    primaryAbility: ["STR", "DEX"],
    savingThrows: ["STR", "CON"],
    armorProficiencies: ["Light", "Medium", "Heavy", "Shields"],
    weaponProficiencies: ["Simple", "Martial"],
    skillChoices: [
      "Acrobatics",
      "Animal Handling",
      "Athletics",
      "History",
      "Insight",
      "Intimidation",
      "Perception",
      "Survival"
    ],
    numSkillChoices: 2,
    features: {
      1: ["Fighting Style", "Second Wind"],
      2: ["Action Surge"],
      3: ["Martial Archetype"]
    }
  }
  // Add other classes following the same structure
];