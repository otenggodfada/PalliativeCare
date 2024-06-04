import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { auth } from '../service/firebaseservice'; // Assuming this imports Firebase Auth
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const MyChats = () => {
  const db = getFirestore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, 'messages'),
        where('senderUid', '==', user.uid),
        orderBy('timestamp', 'desc')
      );
      const unsubscribe = onSnapshot(q, snapshot => {
        const chatUsers = [];
        const userMap = new Map();

        snapshot.forEach(doc => {
          const data = doc.data();
          if (!userMap.has(data.recipientUid)) {
            userMap.set(data.recipientUid, {
              uid: data.recipientUid,
              profilpc: data.profilpc,
              username: data.username,
              lastMessage: data.message,
              lastMessageTime: data.timestamp,
              messageCount: 1
            });
          } else {
            const userData = userMap.get(data.recipientUid);
            userData.messageCount += 1;
            if (data.timestamp > userData.lastMessageTime) {
              userData.lastMessage = data.message;
              userData.lastMessageTime = data.timestamp;
            }
          }
        });

        userMap.forEach(userData => chatUsers.push(userData));
        setUsers(chatUsers);
        setLoading(false); // Set loading to false after data is fetched
      });
      return () => unsubscribe();
    }
  }, [db]);

  const handleUserClick = (user) => {
    navigate('/chat', { state: { from: user.uid, from1: user.profilpc, from2: user.lastMessage, from3: user.username } });
  };

  return (
    <div className="flex flex-col h-screen mt-4">
      <h1 className="text-2xl font-bold mb-4">Chat Users</h1>
      <div className="flex-grow overflow-y-auto">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full">
            <i className="fas fa-spinner fa-spin text-mypink text-4xl"></i>
            <p className="text-mypink mt-2">Loading...</p>
          </div>
        ) : users.length > 0 ? (
          users.map(user => (
            <div key={user.uid} className="flex items-center p-3 mb-3 border rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300 shadow-sm" onClick={() => handleUserClick(user)}>
              <img src={user.profilpc} alt="Profile" className="w-12 h-12 rounded-full mr-3 object-cover" />
              <div className="flex-grow">
                <div className="font-bold text-mypink">{user.username}</div>
                <div className="text-gray-600">{user.lastMessage}</div>
              </div>
              <div className="text-right flex flex-col items-end">
               <div className='bg-mypink h-[20px] w-[20px] flex items-center justify-center rounded-full'>
               <div className="text-white text-[12px] ">{user.messageCount} {user.messageCount > 1 ? '' : ''}</div>
               </div>
                <div className="text-gray-500 text-sm">{formatDistanceToNow(user.lastMessageTime.toDate())} ago</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <i className="fas fa-user-slash text-mypink text-4xl"></i>
            <p className="text-mypink mt-2">No data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChats;
