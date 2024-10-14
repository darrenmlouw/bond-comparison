import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed: number;
  className: string;
}

const Typewriter = ({ text = '', speed = 50, className }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(''); // Reset the displayed text when the component renders or text changes

    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        // Instead of appending, replace the entire displayed text with the substring
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [text, speed]);

  return <p className={className}>{displayedText}</p>;
};

export default Typewriter;
