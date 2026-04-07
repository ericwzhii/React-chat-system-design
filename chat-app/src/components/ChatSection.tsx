'use client';
import { useState, useCallback, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  fromUser: number;
  toUser: number;
}

interface ChatMessage {
  id: number;
  fromUser: number;
  toUser: number;
  message: string;
  timestamp: string;
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userId] = useState(1); // This should come from your auth system
  const [selectedUserId] = useState(2); // This should be dynamic based on selected chat

  // Fetch messages when component mounts
  useEffect(() => {
    fetchMessages();
  }, [userId, selectedUserId]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://18.143.79.95/api/chatSystem/chatByUserId/${userId}`);
      const data = await response.json();
      
      const formattedMessages = data.map((chat: ChatMessage) => ({
        id: chat.id,
        text: chat.message,
        isUser: chat.fromUser === userId,
        fromUser: chat.fromUser,
        toUser: chat.toUser
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const response = await fetch('http://18.143.79.95/api/chatSystem/chat/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fromUser: userId,
            toUser: selectedUserId,
            message: inputValue.trim()
          })
        });

        if (response.ok) {
          const newMessage = {
            id: Date.now(),
            text: inputValue.trim(),
            isUser: true,
            fromUser: userId,
            toUser: selectedUserId
          };
          setMessages(prev => [...prev, newMessage]);
          setInputValue('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }, [inputValue, userId, selectedUserId]);

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <img src="/placeholder-avatar.png" alt="User Avatar" className="w-10 h-10 rounded-full" /> {/* Replace with dynamic avatar */}
          <div>
            <h2 className="text-lg font-semibold">Kevin</h2> {/* Replace with dynamic user name */}
            <p className="text-sm text-gray-500">UI / UX Designer</p> {/* Replace with dynamic title */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Search"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
          <button aria-label="Call" title="Call"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></button>
          <button aria-label="Video Call" title="Video Call"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></button>
          <button aria-label="Options" title="Options"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button>
        </div>
      </div>
      {/* Search input */}
      <div className="p-4 border-b bg-white">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search messages..."
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((message) => (
          <div key={message.id} className={`flex items-start gap-3 ${
            message.isUser ? 'justify-end' : 'justify-start'
          }`}>
            {!message.isUser && (
              <img src="/placeholder-avatar.png" alt="User Avatar" className="w-8 h-8 rounded-full" /> /* Replace with dynamic avatar */
            )}
            <div className={`flex flex-col ${
              message.isUser ? 'items-end' : 'items-start'
            }`}>
              <div
                className={`${
                  message.isUser ? 'bg-purple-600 text-white' : 'bg-white'
                } px-4 py-2 rounded-lg shadow max-w-xs`}
              >
                {/* Sender name and timestamp - add dynamically if needed */}
                {message.text}
                {/* Optional: Add timestamp here */}
              </div>
            </div>
            {message.isUser && (
              <img src="/placeholder-avatar.png" alt="User Avatar" className="w-8 h-8 rounded-full" /> /* Replace with dynamic avatar */
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 bg-white items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message here.."
          className="flex-1 px-3 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <button aria-label="Mention"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8a4 4 0 014 4v.01M17 8a4 4 0 014 4v.01M12 8v.01M12 12v.01M12 16v.01M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-5m-1-9h.01M13 16h.01"></path></svg></button>
          <button aria-label="Attach file" title="Attach file"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.414 6.586a2 2 0 00-.707 2.828l1.493 1.493a3 3 0 01-.424 4.243l-1.493 1.493a2 2 0 01-2.828-2.828l1.493-1.493a3 3 0 00.424-.424l6.586-6.414a2 2 0 012.828 2.828l-6.414 6.586a4 4 0 00-5.656-5.656l-1.48 1.48"></path></svg></button>
          <button aria-label="Insert emoji" title="Insert emoji"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
          <button aria-label="Insert image from gallery" title="Insert image from gallery"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button>
          <button aria-label="Insert link" title="Insert link"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-6 6m6-6L10 14"></path></svg></button>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-full" aria-label="Send message" title="Send message"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></button>
      </form>
    </div>
  );
} 