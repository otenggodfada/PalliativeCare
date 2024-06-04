import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../service/firebaseservice'; // Assuming this imports Firebase Auth
import { useNavigate } from 'react-router-dom';

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
        where('senderUid', '==', user.uid)
      );
      const unsubscribe = onSnapshot(q, snapshot => {
        const chatUsers = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (!chatUsers.some(user => user.uid === data.recipientUid)) {
            chatUsers.push({
              uid: data.recipientUid,
              profilpc: data.profilpc,
              username: data.username,
              email: data.email,
            });
          }
        });
        setUsers(chatUsers);
        setLoading(false); // Set loading to false after data is fetched
      });
      return () => unsubscribe();
    }
  }, [db]);

  const handleUserClick = (user) => {
    navigate('/chat', { state: { from: user.uid, from1: user.profilpc, from2: user.email, from3: user.username } });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Users</h1>
      <div className="flex-grow overflow-y-auto bg-white shadow-inner p-4">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full">
            <i className="fas fa-spinner fa-spin text-gray-600 text-4xl"></i>
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        ) : users.length > 0 ? (
          users.map(user => (
            <div key={user.uid} className="flex items-center p-3 mb-3 border rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300" onClick={() => handleUserClick(user)}>
              <img src={user.profilpc} alt="Profile" className="w-12 h-12 rounded-full mr-3 object-cover" />
              <div>
                <div className="font-bold">{user.username}</div>
                <div className="text-gray-600">{user.email}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <i className="fas fa-user-slash text-gray-600 text-4xl"></i>
            <p className="text-gray-600 mt-2">No data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChats;
