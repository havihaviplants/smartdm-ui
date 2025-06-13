// src/components/AnswerBubble.tsx
import React from 'react';

type AnswerBubbleProps = {
  text: string;
};

const AnswerBubble: React.FC<AnswerBubbleProps> = ({ text }) => {
  return (
    <div style={styles.bubble}>
      {text}
    </div>
  );
};

const styles = {
  bubble: {
    backgroundColor: '#f1f1f1',
    padding: '10px 14px',
    borderRadius: '12px',
    margin: '8px 0',
    maxWidth: '70%',
    alignSelf: 'flex-start' as const,
  },
};

export default AnswerBubble;
