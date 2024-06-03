// src/components/MyChats.js

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../service/firebaseservice'; // Make sure this imports Firebase Auth

const MyChats = () => {
  const db = getFirestore();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, 'messages'),
        where('senderUid', '==', user.uid),
        orderBy('timestamp')
      );

      const unsubscribe = onSnapshot(q, snapshot => {
        const chatData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChats(chatData);
      });

      return () => unsubscribe();
    }
  }, [db]);

  return (
    <div className="flex flex-col  p-4 mt-[90px]">
      <h1 className="text-2xl font-bold mb-4">My Chats</h1>
      <div className="flex-grow overflow-y-auto">
        {chats.map(chat => (
          <div key={chat.id} className="p-2 border-b">
            <p className="font-semibold">{chat.message}</p>
            <p className="text-sm text-gray-500">
              To: {chat.recipientUid} | {new Date(chat.timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyChats;
