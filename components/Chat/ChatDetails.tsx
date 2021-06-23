import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';

import { uniqueId } from 'lodash';

interface Chat {
  id: string;
  content: string;
  senderId: number;
}

type ChatHistory = {
  id: string;
  chats: Chat[];
};

const ChatDetails = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>('');

  const inputEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mockChats: Chat[] = [
      { id: '1', content: 'first', senderId: 2 },
      { id: '2', content: 'second', senderId: 1 },
      { id: '3', content: 'third', senderId: 2 },
    ];

    const mockChatHistory: ChatHistory = {
      id: '1',
      chats: mockChats,
    };

    setChats(mockChats);
    return () => {
      // cleanup;
    };
  }, []);

  const sendMessage = (msg: string) => {
    const newMessage: Chat = {
      id: uniqueId('test'),
      content: msg,
      senderId: 1,
    };
    setChats(chats => [...chats, newMessage]);
    if (inputEl.current) {
      inputEl.current.innerHTML = '';
    }
  };

  return (
    <div className="chat-details">
      <h1>Chat Details</h1>
      <div className="chat-history">
        {chats.map(chat => (
          <div
            className={chat.senderId === 1 ? 'chat-right' : 'chat-left'}
            key={chat.id}
          >
            {chat.content}
          </div>
        ))}
      </div>
      <div className="chat-details-footer">
        <div
          ref={inputEl}
          className="chat-input"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onInput={(e: BaseSyntheticEvent) => {
            setMessage(e.target.textContent);
          }}
        ></div>
        <button className="send-button" onClick={() => sendMessage(message)}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDetails;
