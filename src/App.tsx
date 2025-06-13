import React, { useState, useRef, useEffect } from 'react';
import AskBubble from './components/AskBubble';
import AnswerBubble from './components/AnswerBubble';


type ChatItem = {
  type: 'user' | 'bot';
  text: string;
};

function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ChatItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 🔁 자동 스크롤 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 🧠 chat이 바뀔 때마다 스크롤 하단 이동
  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatItem = { type: 'user', text: input };
    setChat((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      const botMessage: ChatItem = { type: 'bot', text: data.answer || data.detail || '응답이 없습니다.' };
      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatItem = { type: 'bot', text: '에러가 발생했습니다. 다시 시도해주세요.' };
      setChat((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {chat.map((item, idx) =>
          item.type === 'user' ? (
            <AskBubble key={idx} text={item.text} />
          ) : (
            <AnswerBubble key={idx} text={item.text} />
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputArea}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.textarea}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSend} style={styles.button}>
          전송
        </button>
      </div>
    </div>
  );
}

// ✅ 인라인 스타일 구조
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '16px',
    boxSizing: 'border-box',
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  inputArea: {
    display: 'flex',
    gap: '8px',
  },
  textarea: {
    flex: 1,
    padding: '8px',
    fontSize: '16px',
    borderRadius: '8px',
    resize: 'none',
    maxHeight: '120px',
    overflowY: 'auto',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default App;
