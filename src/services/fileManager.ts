export async function saveToFile(
  category: 'locations' | 'factions' | 'events',
  name: string,
  content: any
): Promise<void> {
  try {
    // In a real electron app, this would use the fs module to save files
    console.log(`Saving ${category}/${name}:`, content);
    
    // For now, we'll just save to localStorage as a demo
    const key = `${category}_${name}`;
    localStorage.setItem(key, JSON.stringify(content));
  } catch (error) {
    console.error('Failed to save file:', error);
    throw error;
  }
}

export async function loadFromFile(
  category: 'locations' | 'factions' | 'events',
  name: string
): Promise<any> {
  try {
    // In a real electron app, this would use the fs module to load files
    const key = `${category}_${name}`;
    const content = localStorage.getItem(key);
    return content ? JSON.parse(content) : null;
  } catch (error) {
    console.error('Failed to load file:', error);
    throw error;
  }
}