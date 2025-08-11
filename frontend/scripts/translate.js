import fs from 'fs';
import path from 'path';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OPENAI_API_KEY is required');
  process.exit(1);
}

async function translate() {
  const enPath = path.join(process.cwd(), 'src', 'i18n', 'locales', 'en', 'common.json');
  const arPath = path.join(process.cwd(), 'src', 'i18n', 'locales', 'ar', 'common.json');

  const enContent = fs.readFileSync(enPath, 'utf8');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Translate the provided JSON keys to Arabic and return a valid JSON object preserving the keys.'
        },
        {
          role: 'user',
          content: enContent
        }
      ],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    console.error('OpenAI API error', await response.text());
    process.exit(1);
  }

  const data = await response.json();
  const translation = data.choices[0].message.content;

  fs.writeFileSync(arPath, translation);
  console.log('Arabic translations updated');
}

translate().catch((err) => {
  console.error(err);
  process.exit(1);
});
