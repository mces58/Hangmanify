import { GoogleGenerativeAI } from '@google/generative-ai';
import dns from 'dns';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const commitMessageFile = process.argv[2];
let commitMessage: string;

if (!commitMessageFile) {
  console.error('Please provide a commit message file path.');
  process.exit(1);
}

try {
  commitMessage = fs.readFileSync(commitMessageFile, 'utf8').trim();
} catch (error) {
  console.error('Error reading the commit message file:', error);
  process.exit(1);
}

function checkInternetConnection(): Promise<boolean> {
  return new Promise((resolve) => {
    dns.lookup('google.com', (err) => {
      if (err && err.code === 'ENOTFOUND') resolve(false);
      else resolve(true);
    });
  });
}

async function isPastTense(text: string): Promise<boolean> {
  const prompt = `Determine if the following text is in past tense:\n\n"${text}"\n\nRespond with "yes" or "no"`;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedText = response.text();
    const isPast = !!/yes/i.test(generatedText);
    return isPast;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

async function main(): Promise<void> {
  const isConnected = await checkInternetConnection();
  if (!isConnected) {
    console.error('No internet connection. Please check your network and try again.');
    process.exit(1);
  }

  try {
    const isPast = await isPastTense(commitMessage);

    if (isPast) {
      console.error('Commit message is in past tense.');
      process.exit(1);
    } else {
      console.info('Commit message is not in past tense.');
      process.exit(0);
    }
  } catch (error) {
    console.error('Error checking commit message:', error);
    process.exit(1);
  }
}

main();
