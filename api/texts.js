export default function handler(req, res) {
  const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect, so keep typing!",
    "Typing tests improve your speed and accuracy.",
    "Serverless functions are great for APIs.",
    "Vercel makes deployment easy and fast."
  ];
  const randomIndex = Math.floor(Math.random() * texts.length);
  res.status(200).json({ text: texts[randomIndex] });
}
