// src/components/AskBubble.tsx
import React from 'react';

type AskBubbleProps = {
  text: string;
};

const AskBubble: React.FC<AskBubbleProps> = ({ text }) => {
  return (
    <div style={styles.bubble}>
      {text}
    </div>
  );
};

const styles = {
  bubble: {
    backgroundColor: '#DCF8C6',
    padding: '10px 14px',
    borderRadius: '12px',
    margin: '8px 0',
    maxWidth: '70%',
    alignSelf: 'flex-end' as const,
  },
};

export default AskBubble;
