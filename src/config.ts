export const config = {
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  outputDirectory: process.env.OUTPUT_DIR || 'output',
  imageDirectory: process.env.IMAGE_DIR || 'images'
};