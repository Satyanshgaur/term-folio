import 'dotenv/config';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

async function testConnection() {
  console.log('--- AI Connectivity Diagnostic ---');
  
  if (!OPENROUTER_API_KEY) {
    console.error('ERROR: OPENROUTER_API_KEY is not defined in your .env file.');
    return;
  }

  console.log(`Target Model: ${MODEL}`);
  console.log(`API Key: ${OPENROUTER_API_KEY.substring(0, 10)}...`);
  console.log('Sending request to OpenRouter...');

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Portfolio Local Test"
      },
      body: JSON.stringify({
        "model": MODEL,
        "messages": [
          { "role": "system", "content": "You are a technical assistant. Keep your response very short." },
          { "role": "user", "content": "What is 2+2?" }
        ]
      })
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('--- SUCCESS ---');
      console.log('Response Content:');
      console.log(data.choices?.[0]?.message?.content || 'No content found in choices');
    } else {
      console.log('--- FAILURE ---');
      console.log('Error Details:', JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('--- CRITICAL ERROR ---');
    console.error(error);
  }
}

testConnection();
