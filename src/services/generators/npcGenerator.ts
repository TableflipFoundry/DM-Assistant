import OpenAI from 'openai';
import { races } from '../dnd/races';
import { classes } from '../dnd/classes';
import { backgrounds } from '../dnd/backgrounds';

export interface NPCDetails {
  name: string;
  race: string;
  class?: string;
  background: string;
  level: number;
  alignment: string;
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  skills: string[];
  description: string;
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  equipment: string[];
  spells?: string[];
  features: string[];
  connections: {
    allies: string[];
    enemies: string[];
    organizations: string[];
  };
}

const DND_ALIGNMENTS = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
];

export async function generateNPC(
  openai: OpenAI,
  prompt: string,
  context?: { location?: string; faction?: string }
): Promise<NPCDetails> {
  const systemPrompt = `You are a D&D 5E NPC creator. Generate a detailed NPC following these requirements:
- Use official D&D 5E races, classes, and backgrounds
- Create realistic ability scores (3-18 range, using standard array or point buy)
- Include personality traits that fit their background and alignment
- If provided, incorporate connections to the location or faction
- Include relevant class features and equipment
- For spellcasters, include their known spells
- Ensure all details align with D&D 5E rules
Output should be structured JSON with no additional text.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Create an NPC with these details: ${prompt}
${context ? `This NPC is connected to: ${JSON.stringify(context)}` : ''}` }
    ],
    temperature: 0.7,
    response_format: { type: "json_object" }
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No content generated');

  try {
    const npc = JSON.parse(content);
    validateNPC(npc);
    return npc;
  } catch (error) {
    console.error('Failed to parse NPC:', error);
    throw new Error('Failed to generate valid NPC data');
  }
}

function validateNPC(npc: any): asserts npc is NPCDetails {
  // Validate required fields
  if (!npc.name || !npc.race || !npc.background || !npc.alignment) {
    throw new Error('Missing required NPC fields');
  }

  // Validate ability scores
  const abilities = npc.abilities;
  if (!abilities || 
      !Object.values(abilities).every(score => score >= 3 && score <= 18)) {
    throw new Error('Invalid ability scores');
  }

  // Validate alignment
  if (!DND_ALIGNMENTS.includes(npc.alignment)) {
    throw new Error('Invalid alignment');
  }

  // Validate race
  if (!races.some(r => r.name === npc.race || r.subraces?.some(sr => sr.name === npc.race))) {
    throw new Error('Invalid race');
  }

  // Validate class if provided
  if (npc.class && !classes.some(c => c.name === npc.class)) {
    throw new Error('Invalid class');
  }

  // Validate background
  if (!backgrounds.some(b => b.name === npc.background)) {
    throw new Error('Invalid background');
  }
}</content>