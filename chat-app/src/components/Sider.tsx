import { FaHome, FaBuilding, FaHourglassHalf, FaEnvelope, FaList, FaCalendarAlt, FaComments, FaCog, FaUser } from 'react-icons/fa';

const currentUser = {
  id: 5,
  username: 'Harry Potter',
  profileImage: 'https://picsum.photos/id/9/500/500',
  online: true,
};

const icons = [
  { icon: <FaHome size={26} />, active: false },
  { icon: <FaBuilding size={26} />, active: false },
  { icon: <FaHourglassHalf size={26} />, active: false },
  { icon: <FaEnvelope size={26} />, active: true },
  { icon: <FaList size={26} />, active: false },
  { icon: <FaCalendarAlt size={26} />, active: false },
  { icon: <FaComments size={26} />, active: false, notification: 2 },
  { icon: <FaCog size={26} />, active: false },
  { icon: <FaUser size={26} />, active: false },
];

export default function Sider() {
  return (
    <div className="relative h-screen w-24">
      {/* Sidebar background and icons */}
      <div className="absolute top-1 left-0 w-19 h-[calc(100%-150px)] bg-[#6C63FF] rounded-tr-4xl rounded-br-3xl flex flex-col items-center justify-center z-10">
        <div className="flex flex-col items-center gap-9.5 flex-1 justify-center w-full pt-8 pb-8">
          {icons.map((item, idx) => (
            <div key={idx} className="relative w-full flex items-center justify-center">
              {/* Active red vertical bar */}
              {item.active && (
                <span className="absolute left-0 h-10 w-1 bg-red-500"></span>
              )}
              {/* Icon */}
              <span className={`z-10 ${item.active ? 'text-white' : 'opacity-80 hover:opacity-100'} cursor-pointer w-full flex justify-center`}>
                {item.icon}
              </span>
              {/* Notification badge */}
              {item.notification && (
                <span className="absolute -top-2 right-4 bg-yellow-400 text-xs text-black rounded-full px-2 font-bold">{item.notification}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col items-center z-20">
        <div className="relative">
          <img src={currentUser.profileImage} alt={currentUser.username} className="w-12 h-12 rounded-full border-2 border-white" />
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
        </div>
        <span className="text-xs font-bold text-black mt-2">{currentUser.username}</span>
      </div>
    </div>
  );
} 