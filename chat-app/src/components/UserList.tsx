'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdDoneAll } from 'react-icons/md';

interface User {
  id: number;
  username: string;
  position: string;
  address: string;
  phone: string;
  email: string;
  profileImage: string;
  lastMessage: string;
  date: string;
  time: string;
  unread: number;
  online: boolean;
  checked: boolean;
}

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://18.143.79.95/api/chatSystem/users/list');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  const handleUserClick = useCallback((userId: number) => {
    setSelectedUserId(userId);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleMeetingClick = useCallback(() => {
    if (selectedUserId) {
      console.log('Starting meeting with user:', selectedUserId);
    }
  }, [selectedUserId]);

  const handleScheduleClick = useCallback(() => {
    if (selectedUserId) {
      console.log('Scheduling with user:', selectedUserId);
    }
  }, [selectedUserId]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="bg-[#F6F7FB] rounded-2xl p-4 shadow-md">
      {/* Search with moderate padding */}
      <div className="relative mb-3">
        <span className="absolute left-4 top-3 text-gray-400">
          <FaSearch size={16} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Contact"
          className="w-full pl-10 pr-3 py-2.5 rounded-xl border-none bg-[#EDEDED] text-gray-500 placeholder-gray-400 focus:outline-none"
        />
      </div>
      
      {/* User List with better proportions */}
      <div className="max-h-56 overflow-y-auto space-y-2">
        {filteredUsers.map((user) => (
          <div 
            key={user.id} 
            className={`flex items-center gap-3 relative group py-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 transition-colors ${
              selectedUserId === user.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleUserClick(user.id)}
          >
            {/* Avatar + Status */}
            <div className="relative">
              <img src={user.profileImage} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
            
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <div className="font-bold text-base text-black leading-tight">{user.username}</div>
                <div className="text-xs text-gray-600">{user.time}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400 truncate max-w-[140px]">{user.lastMessage}</div>
                <div className="flex items-center space-x-1">
                  <span className="text-[#6C63FF]">
                    <MdDoneAll size={18} className={user.checked ? '' : 'text-gray-400'} />
                  </span>
                  {user.unread > 0 && (
                    <span className="bg-[#F44336] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Action Buttons with better proportions */}
      <div className="flex gap-3 mt-4">
        <button 
          onClick={handleMeetingClick}
          className="flex-1 bg-[#6C63FF] text-white rounded-xl py-2 font-bold text-base shadow hover:bg-[#554ee2] transition"
        >
          Meeting
        </button>
        <button 
          onClick={handleScheduleClick}
          className="flex-1 bg-[#EDEDED] text-black rounded-xl py-2 font-bold text-base shadow hover:bg-gray-300 transition"
        >
          Schedule
        </button>
      </div>
    </div>
  );
}