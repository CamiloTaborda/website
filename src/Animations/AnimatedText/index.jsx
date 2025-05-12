import { useEffect, useState } from 'react';

const AnimatedText = ({ text, speed = 150 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(text.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (charIndex === text.length) {
        setTimeout(() => setIsDeleting(true), 3000);
      }

      if (isDeleting) {
        setDisplayText('');
        setCharIndex(0); 
        setIsDeleting(false);
      }
    };

    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, text, speed]);

  return <p className="text-white p-4 sm:p-0 text-base md:text-lg xl:text-xl 2xl:text-2xl max-w-lg leading-relaxed">{displayText}</p>;
};

export default AnimatedText;