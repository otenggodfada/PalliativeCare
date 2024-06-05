import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { auth } from '../service/firebaseservice'; // Assuming this imports Firebase Auth
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const MyChats = () => {
  const db = getFirestore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const sentQuery = query(
        collection(db, 'messages'),
        where('senderUid', '==', user.uid),
        orderBy('timestamp', 'desc')
      );

      const receivedQuery = query(
        collection(db, 'messages'),
        where('recipientUid', '==', user.uid),
        orderBy('timestamp', 'desc')
      );

      const unsubscribeSent = onSnapshot(sentQuery, snapshot => {
        const sentMessages = snapshot.docs.map(doc => doc.data());
        handleMessages(sentMessages, 'recipientUid');
      });

      const unsubscribeReceived = onSnapshot(receivedQuery, snapshot => {
        const receivedMessages = snapshot.docs.map(doc => doc.data());
        handleMessages(receivedMessages, 'senderUid');
      });

      const handleMessages = (messages, uidKey) => {
        const userMap = new Map();

        messages.forEach(data => {
          const uid = data[uidKey];
          if (!userMap.has(uid)) {
            userMap.set(uid, {
              uid,
              profilpc: data[uidKey === 'recipientUid' ? 'recipientprofilpc' : 'senderprofilpc'],
              username: data[uidKey === 'recipientUid' ? 'recipientusername' : 'senderusername'],
              lastMessage: data.sendermessage,
              lastMessageTime: data.timestamp.toDate(), // Convert timestamp to Date object
              messageCount: 1,
              email: data[uidKey === 'recipientUid' ? 'recipientemail' : 'senderemail'], // Add email
              senderusername: data.senderusername, // Add senderusername
              senderprofilpc: data.senderprofilpc, // Add senderprofilpc
              senderemail: data.senderemail // Add senderemail
            });
          } else {
            const userData = userMap.get(uid);
            userData.messageCount += 1;
            if (data.timestamp > userData.lastMessageTime) {
              userData.lastMessage = data.sendermessage;
              userData.lastMessageTime = data.timestamp.toDate(); // Convert timestamp to Date object
            }
          }
        });

        const chatUsers = Array.from(userMap.values());
        setUsers(prevUsers => mergeUsers(prevUsers, chatUsers));
        setFilteredUsers(prevUsers => mergeUsers(prevUsers, chatUsers));
        setLoading(false);
      };

      const mergeUsers = (prevUsers, newUsers) => {
        const mergedUsersMap = new Map();

        prevUsers.concat(newUsers).forEach(user => {
          if (!mergedUsersMap.has(user.uid)) {
            mergedUsersMap.set(user.uid, user);
          } else {
            const existingUser = mergedUsersMap.get(user.uid);
            if (user.lastMessageTime > existingUser.lastMessageTime) {
              existingUser.lastMessage = user.lastMessage;
              existingUser.lastMessageTime = user.lastMessageTime;
            }
            existingUser.messageCount += user.messageCount;
          }
        });

        return Array.from(mergedUsersMap.values());
      };

      return () => {
        unsubscribeSent();
        unsubscribeReceived();
      };
    }
  }, [db]);

  const handleUserClick = (user) => {
    navigate('/chat', {
      state: {
        from: user.uid,
        from1: user.profilpc,
        from2: user.lastMessage,
        from3: user.username,
        from4: user.senderusername,
        from5: user.senderprofilpc,
        from6: user.senderemail,
        from7: user.email // Add email to state
      }
    });
  };

  const handleSearchInput = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="flex flex-col h-screen mt-4">
      <h1 className="text-2xl font-bold mb-4">Chat Users</h1>
      <input
        type="text"
        placeholder="Search by username"
        value={searchInput}
        onChange={handleSearchInput}
        className="p-2 mb-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mypink"
      />
      <div className="flex-grow overflow-y-auto">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full absolute top-0 left-0 bottom-0 right-0">
            <i className="fas fa-spinner fa-spin text-mypink text-4xl"></i>
            <p className="text-mypink mt-2">Loading...</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div key={user.uid} className="flex items-center p-3 mb-3 border rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300 shadow-sm" onClick={() => handleUserClick(user)}>
              <img src={user.profilpc} alt="Profile" className="w-12 h-12 rounded-full mr-3 object-cover" />
              <div className="flex-grow">
                <div className="font-bold text-mypink">{user.username}</div>
                <div className="text-gray-600">{user.lastMessage}</div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="bg-mypink h-[20px] w-[20px] flex items-center justify-center rounded-full">
                  <div className="text-white text-[12px]">{user.messageCount}</div>
                </div>
                <div className="text-gray-500 text-sm">{formatDistanceToNow(user.lastMessageTime)} ago</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full absolute top-0 left-0 bottom-0 right-0">
            <i className="fas fa-user-slash text-mypink text-4xl"></i>
            <p className="text-mypink mt-2">No data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChats;
