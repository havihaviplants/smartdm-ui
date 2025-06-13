// src/components/ResultCard.tsx
import React from 'react';

type ResultCardProps = {
  date: string;
  content: string;
  tags: string[];
};

const ResultCard: React.FC<ResultCardProps> = ({ date, content, tags }) => {
  return (
    <div className="border rounded-xl p-4 shadow mb-4">
      <p className="text-sm text-gray-500">{date}</p>
      <p className="mt-2 text-base">{content}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;
