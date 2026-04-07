import Sider from '@/components/Sider';
import UserList from '@/components/UserList';
import GroupList from '@/components/GroupList';
import ChatSection from '@/components/ChatSection';
import UserDetails from '@/components/UserDetails';

export default function Home() {
  return (
    <div className="min-h-screen h-screen w-screen bg-[#EDEDED] flex flex-row items-stretch p-0 gap-0 overflow-hidden">
      <Sider />
      <div className="flex flex-1 gap-0 px-2 pt-2 h-full">
        <div className="w-80 flex flex-col gap-4 h-full">
          <h1 className="text-2xl font-bold text-black mb-2">Chat</h1>
          <UserList />
          <GroupList />
        </div>
        {/* Center: Chat Section */}
        <div className="flex-1 flex px-6 pt-14 pb-4  rounded-2xl h-full">
          <ChatSection />
        </div>
        {/* Right: User Details */}
        <div className="w-72 border-l bg-white hidden lg:block h-full">
          <UserDetails />
        </div>
      </div>
    </div>
  );
}
