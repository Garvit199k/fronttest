export default function handler(req, res) {
  const shortTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect, so keep typing!",
    "Typing tests improve your speed and accuracy."
  ];
  const mediumTexts = [
    "Serverless functions are great for APIs.",
    "Vercel makes deployment easy and fast.",
    "Consistent practice leads to improvement in typing speed."
  ];
  const longTexts = [
    "Typing is a fundamental skill that improves productivity and communication.",
    "Regular typing practice can help reduce errors and increase speed over time.",
    "Advanced typing tests challenge your accuracy and speed with longer passages."
  ];

  const duration = parseInt(req.query.duration) || 60;
  const level = parseInt(req.query.level) || 1;

  let texts;
  if (level <= 3) {
    texts = shortTexts;
  } else if (level <= 6) {
    texts = mediumTexts;
  } else {
    texts = longTexts;
  }

  const randomIndex = Math.floor(Math.random() * texts.length);
  res.status(200).json({ text: texts[randomIndex] });
}
