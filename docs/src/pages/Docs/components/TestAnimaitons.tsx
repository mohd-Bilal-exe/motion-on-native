import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

export default function TextAnimations() {
  const togglePresence = () => {
    setTexts(['content1', 'content2', 'content3']);
  };
  const [texts, setTexts] = useState(['content1', 'content2', 'content3']);

  const addRandomText = () => {
    const newText = `content${Date.now()}`;
    setTexts([...texts, newText]);
  };

  const removeRandomText = () => {
    if (texts.length === 0) return;

    const randomIndex = Math.floor(Math.random() * texts.length);
    setTexts(texts.filter((_, index) => index !== randomIndex));
  };
  console.log(texts);
  return (
    <div className="flex flex-col w-full h-full">
      <AnimatePresence>
        {texts.map(text => (
          <TextComponent text={text} key={text} />
        ))}
      </AnimatePresence>
      <button onClick={togglePresence}>Reset To Default {`Current value being `}</button>
      <button onClick={addRandomText}>Add Random Text</button>
      <button onClick={removeRandomText}>Remove Random Text</button>
    </div>
  );
}
const TextComponent = ({ text }: { text: string }) => {
  return (
    <motion.div
      key={text}
      initial={{ translateX: -100 }}
      animate={{ translateX: 0 }}
      exit={{ translateX: 1000 }}
      className="p-7"
    >
      <h1>{text}</h1>
    </motion.div>
  );
};
