import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OpenAI API key is required. Please add VITE_OPENAI_API_KEY to your .env file.');
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

interface NPCData {
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment: string;
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  proficiencies: {
    skills: string[];
    tools: string[];
    languages: string[];
  };
  equipment: {
    weapons: string[];
    armor: string[];
    items: string[];
  };
  features: string[];
  spells?: {
    cantrips: string[];
    level1: string[];
    level2: string[];
  };
  description: string;
  personality: string;
  motivation: string;
  connections: {
    allies: string[];
    enemies: string[];
    organizations: string[];
  };
}

export async function generateNPC(prompt: string = ''): Promise<NPCData> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a D&D 5E world-building assistant. Generate an NPC and return ONLY a JSON object with the following structure:
          {
            "name": "string",
            "race": "string",
            "class": "string",
            "level": number,
            "background": "string",
            "alignment": "string",
            "abilities": {
              "strength": number,
              "dexterity": number,
              "constitution": number,
              "intelligence": number,
              "wisdom": number,
              "charisma": number
            },
            "proficiencies": {
              "skills": ["string"],
              "tools": ["string"],
              "languages": ["string"]
            },
            "equipment": {
              "weapons": ["string"],
              "armor": ["string"],
              "items": ["string"]
            },
            "features": ["string"],
            "spells": {
              "cantrips": ["string"],
              "level1": ["string"],
              "level2": ["string"]
            },
            "description": "string",
            "personality": "string",
            "motivation": "string",
            "connections": {
              "allies": ["string"],
              "enemies": ["string"],
              "organizations": ["string"]
            }
          }
          
          Use official D&D 5E content including:
          - Official races, classes, and backgrounds
          - Standard array or point buy for abilities (no roll under 8 or over 15 before modifiers)
          - Equipment from the PHB
          - Spells from the PHB if a spellcaster
          - Realistic personality traits and motivations`
        },
        {
          role: "user",
          content: prompt || "Generate a detailed NPC suitable for a D&D 5E campaign."
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    try {
      const parsedContent = JSON.parse(content);
      return parsedContent as NPCData;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Failed to parse NPC data from response');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

interface LocationData {
  name: string;
  type: string;
  size: 'Thorp' | 'Hamlet' | 'Village' | 'Small Town' | 'Large Town' | 'Small City' | 'Large City';
  population: number;
  government: {
    type: string;
    leaders: string[];
  };
  economy: {
    resources: string[];
    trades: string[];
    wealth: 'Poor' | 'Modest' | 'Prosperous' | 'Wealthy';
  };
  defenses: {
    walls?: string;
    guards: number;
    specialDefenses?: string[];
  };
  description: string;
  features: string[];
  pointsOfInterest: {
    name: string;
    type: string;
    description: string;
  }[];
}

export async function generateLocation(prompt: string = ''): Promise<LocationData> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a D&D 5E world-building assistant. Generate a location and return ONLY a JSON object with the following structure:
          {
            "name": "string",
            "type": "string",
            "size": "one of: Thorp, Hamlet, Village, Small Town, Large Town, Small City, Large City",
            "population": number,
            "government": {
              "type": "string",
              "leaders": ["string"]
            },
            "economy": {
              "resources": ["string"],
              "trades": ["string"],
              "wealth": "one of: Poor, Modest, Prosperous, Wealthy"
            },
            "defenses": {
              "walls": "string",
              "guards": number,
              "specialDefenses": ["string"]
            },
            "description": "string",
            "features": ["string"],
            "pointsOfInterest": [
              {
                "name": "string",
                "type": "string",
                "description": "string"
              }
            ]
          }
          
          Include:
          - Realistic population based on settlement size
          - Economic factors that make sense for the location
          - Appropriate defenses for the region and wealth level
          - Notable locations that adventurers might visit
          - Key NPCs who run or influence the location`
        },
        {
          role: "user",
          content: prompt || "Generate a detailed location suitable for a D&D 5E campaign."
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    try {
      const parsedContent = JSON.parse(content);
      return parsedContent as LocationData;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Failed to parse location data from response');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

interface FactionData {
  name: string;
  type: string;
  alignment: string;
  goals: {
    primary: string;
    secondary: string[];
  };
  leadership: {
    structure: string;
    leaders: {
      name: string;
      role: string;
      description: string;
    }[];
  };
  resources: {
    wealth: string;
    assets: string[];
    allies: string[];
  };
  description: string;
  methods: string[];
  hideouts: string[];
}

export async function generateFaction(prompt: string = ''): Promise<FactionData> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a D&D 5E world-building assistant. Generate a faction and return ONLY a JSON object with the following structure:
          {
            "name": "string",
            "type": "string",
            "alignment": "string",
            "goals": {
              "primary": "string",
              "secondary": ["string"]
            },
            "leadership": {
              "structure": "string",
              "leaders": [
                {
                  "name": "string",
                  "role": "string",
                  "description": "string"
                }
              ]
            },
            "resources": {
              "wealth": "string",
              "assets": ["string"],
              "allies": ["string"]
            },
            "description": "string",
            "methods": ["string"],
            "hideouts": ["string"]
          }
          
          Include:
          - Clear organizational structure and leadership
          - Realistic goals and methods
          - Resources and assets that make sense for their type
          - Connections to other potential factions or NPCs`
        },
        {
          role: "user",
          content: prompt || "Generate a detailed faction suitable for a D&D 5E campaign."
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    try {
      const parsedContent = JSON.parse(content);
      return parsedContent as FactionData;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Failed to parse faction data from response');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

interface EventData {
  name: string;
  type: 'Historical' | 'Current' | 'Prophesied';
  scale: 'Local' | 'Regional' | 'Global';
  description: string;
  causes: string[];
  consequences: {
    immediate: string[];
    longTerm: string[];
  };
  involvedParties: {
    mainActors: string[];
    affectedGroups: string[];
  };
  locations: string[];
  relatedEvents?: string[];
}

export async function generateEvent(prompt: string = ''): Promise<EventData> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a D&D 5E world-building assistant. Generate an event and return ONLY a JSON object with the following structure:
          {
            "name": "string",
            "type": "one of: Historical, Current, Prophesied",
            "scale": "one of: Local, Regional, Global",
            "description": "string",
            "causes": ["string"],
            "consequences": {
              "immediate": ["string"],
              "longTerm": ["string"]
            },
            "involvedParties": {
              "mainActors": ["string"],
              "affectedGroups": ["string"]
            },
            "locations": ["string"],
            "relatedEvents": ["string"]
          }
          
          Include:
          - Clear causes and consequences
          - Involved parties and their motivations
          - Impact on the world or region
          - Potential plot hooks for adventures`
        },
        {
          role: "user",
          content: prompt || "Generate a detailed event suitable for a D&D 5E campaign."
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    try {
      const parsedContent = JSON.parse(content);
      return parsedContent as EventData;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Failed to parse event data from response');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}