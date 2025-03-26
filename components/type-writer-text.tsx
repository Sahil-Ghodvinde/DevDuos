import { useState, useEffect } from "react";

interface TypeWriterTextProps {
  text: string;
  highlightWords?: string[];
  highlightColor?: string;
  textColor?: string;
  speed?: number;
}

export default function TypeWriterText({
  text,
  highlightWords = [],
  highlightColor = "text-blue-400",
  textColor = "text-white",
  speed = 20
}: TypeWriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");
    setIsComplete(false);

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  // Process the text to highlight specific words
  const renderHighlightedText = () => {
    if (!isComplete && highlightWords.length === 0) {
      return <span className={textColor}>{displayedText}</span>;
    }

    // Once complete, properly highlight all words
    const textSegments = [];
    const currentText = text;
    let lastIndex = 0;

    // Sort highlight words by their position in the text
    const sortedHighlights = [...highlightWords].sort((a, b) => {
      return text.indexOf(a) - text.indexOf(b);
    });

    sortedHighlights.forEach((word) => {
      const wordIndex = currentText.indexOf(word, lastIndex);
      if (wordIndex !== -1) {
        // Add text before the highlight
        if (wordIndex > lastIndex) {
          textSegments.push(
            <span key={`text-${lastIndex}`} className={textColor}>
              {text.substring(lastIndex, wordIndex)}
            </span>
          );
        }
        
        // Add highlighted word
        textSegments.push(
          <span key={`highlight-${wordIndex}`} className={highlightColor}>
            {word}
          </span>
        );
        
        lastIndex = wordIndex + word.length;
      }
    });

    // Add any remaining text
    if (lastIndex < text.length) {
      textSegments.push(
        <span key={`text-end`} className={textColor}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return textSegments.length ? textSegments : <span className={textColor}>{text}</span>;
  };

  return isComplete ? renderHighlightedText() : <span className={textColor}>{displayedText}</span>;
} 