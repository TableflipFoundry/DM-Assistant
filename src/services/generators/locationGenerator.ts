import { settlementTypes, Settlement } from '../dnd/locations';
import OpenAI from 'openai';

export interface LocationDetails {
  name: string;
  type: string;
  population: number;
  description: string;
  government: {
    type: string;
    leaders: string[];
  };
  economy: {
    mainResources: string[];
    trades: string[];
    wealth: 'Poor' | 'Modest' | 'Wealthy' | 'Rich';
  };
  defenses: {
    walls?: string;
    guards: number;
    specialDefenses?: string[];
  };
  pointsOfInterest: {
    name: string;
    type: string;
    description: string;
  }[];
  notableNPCs: string[];
}

export async function generateLocation(
  openai: OpenAI,
  prompt: string,
  context?: { region?: string; nearbyLocations?: string[] }
): Promise<LocationDetails> {
  const systemPrompt = `You are a D&D 5E location creator. Generate a detailed location with:
- Realistic population and demographics based on settlement size
- Economic factors that make sense for the location
- Defensive capabilities appropriate for the region
- Notable locations that adventurers might visit
- Key NPCs who run or influence the location
Ensure all details align with medieval fantasy settings and D&D lore.
Do not include any introductory text or follow-up questions.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Create a location with these details: ${prompt}
${context ? `This location is connected to: ${JSON.stringify(context)}` : ''}` }
    ],
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No content generated');

  // TODO: Add proper parsing of the GPT response
  // For now, return a mock location
  return {
    name: "Khazdrin Hold",
    type: "Small Town",
    population: 2500,
    description: "A dwarven stronghold built into the side of Mount Harghrim",
    government: {
      type: "Council",
      leaders: ["Thane Drugan Ironfist", "Master Smith Bella Goldbeard"]
    },
    economy: {
      mainResources: ["Iron", "Gold", "Gems"],
      trades: ["Smithing", "Mining", "Jewelcrafting"],
      wealth: "Wealthy"
    },
    defenses: {
      walls: "50-foot stone walls with dwarven runes",
      guards: 100,
      specialDefenses: ["Collapsible tunnels", "Molten metal traps"]
    },
    pointsOfInterest: [
      {
        name: "The Eternal Forge",
        type: "Crafting Hub",
        description: "Ancient forge blessed by Moradin himself"
      }
    ],
    notableNPCs: [
      "Thane Drugan Ironfist",
      "Master Smith Bella Goldbeard",
      "Lorekeeper Thorin Stonechant"
    ]
  };
}