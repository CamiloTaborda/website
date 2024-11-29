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

  return <p className="text-gray-200 text-xl font-medium max-w-lg text-center">{displayText}</p>;
};

export default AnimatedText;