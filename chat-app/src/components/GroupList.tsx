'use client';
import { useEffect, useState } from 'react';

interface Group {
  id: number;
  name: string;
  users: number[];
}

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

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch groups
        const groupsResponse = await fetch('http://18.143.79.95/api/chatSystem/groups/list');
        if (!groupsResponse.ok) {
          throw new Error('Failed to fetch groups');
        }
        const groupsData = await groupsResponse.json();
        setGroups(groupsData);

        // Fetch users
        const usersResponse = await fetch('http://18.143.79.95/api/chatSystem/users/list');
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getInitial = (name: string) => name.charAt(0).toUpperCase();
  
  // Pastel colors with good contrast
  const pastelColors = [
    'bg-purple-200 text-purple-800',
    'bg-yellow-200 text-yellow-800',
    'bg-pink-200 text-pink-800',
    'bg-green-200 text-green-800',
    'bg-blue-200 text-blue-800',
    'bg-red-200 text-red-800',
  ];

  if (isLoading) {
    return <div className="bg-white rounded-2xl p-4 shadow-md flex justify-center items-center">Loading...</div>;
  }
  
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Groups ({groups.length})</h2>
        <button className="text-xl text-gray-600 font-bold hover:text-gray-800 w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">+</button>
      </div>
      
      <div className="h-53 overflow-y-auto space-y-3">
        {groups.map((group) => {
          const groupUsers = group.users.map(uid => users.find(u => u.id === uid)).filter(Boolean) as User[];
          const firstUser = groupUsers[0];
          const initial = getInitial(group.name);
          const colorClass = pastelColors[group.id % pastelColors.length];
  
          return (
            <div key={group.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg p-1.5">
              {/* Left side: Initial */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${colorClass}`}>
                {initial}
              </div>
  
              {/* Group Name */}
              <div className="flex-1 ml-3 text-sm text-gray-800 font-medium truncate">
                {group.name}
              </div>
  
              {/* Right side: Avatar and +n */}
              {firstUser ? (
                <div className="relative h-7 flex items-center">
                  <img
                    src={firstUser.profileImage}
                    alt={firstUser.username}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  {groupUsers.length > 1 && (
                    <div className="w-6 h-6 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#222] font-bold text-[10px] ml-1 shadow">
                      +{groupUsers.length - 1}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}