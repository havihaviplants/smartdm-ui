// src/components/InputForm.tsx
import React, { useState } from 'react';

type InputFormProps = {
  onSubmit: (date: string, tags: string[]) => void;
};

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    onSubmit(date, tags);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">날짜</label>
        <input
          type="text"
          placeholder="예: 2025-06-10"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">태그 (쉼표로 구분)</label>
        <input
          type="text"
          placeholder="예: 문의, 리드"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        조회
      </button>
    </form>
  );
};

export default InputForm;
