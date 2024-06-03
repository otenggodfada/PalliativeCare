import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { auth } from '../service/firebaseservice'; // Assuming this imports Firebase Auth
import { useLocation } from 'react-router-dom';
import Header from './hearder';
const Chat = () => {
  const db = getFirestore();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const location = useLocation();
  const { from: receiverId, from1: profilpc, from2: email, from3: username } = location.state;

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, 'messages'),
          where('recipientUid', 'in', [user.uid, receiverId]),
          where('senderUid', 'in', [user.uid, receiverId]),
          orderBy('timestamp')
        ),
        snapshot => {
          setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      );
      return () => unsubscribe();
    }
  }, [db, receiverId]);

  const sendMessage = async (recipientUid) => {
    if (inputMessage.trim() !== '') {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, 'messages'), {
          senderUid: user.uid,
          recipientUid: recipientUid,
          message: inputMessage,
          timestamp: new Date(),
          profilpc: user.photoURL || profilpc, // Assuming user.photoURL is the profile picture URL of the sender
          email: email,
          username: username,
        });
        setInputMessage('');
      }
    }
  };

  return (
 <div>
    <Header title={username}></Header>
       <div className="flex flex-col h-screen  mt-20">
      <div className="flex-grow overflow-y-auto p-4  ">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start my-2 ${msg.senderUid === auth.currentUser.uid ? 'justify-end' : 'justify-start'}`}>
            {msg.senderUid !== auth.currentUser.uid && (
              <img
                src={msg.profilpc}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
            )}
            <div
              className={`p-3 rounded-lg max-w-lg ${
                msg.senderUid === auth.currentUser.uid
                  ? 'bg-mypink text-white'
                  : 'bg-gray-300 text-gray-900'
              }`}
            >
              <span className="font-bold">
                {msg.senderUid === auth.currentUser.uid ? 'You' : msg.username}
              </span>
              : {msg.message}
            </div>
            {msg.senderUid === auth.currentUser.uid && (
              <img
                src={msg.profilpc}
                alt="Profile"
                className="w-10 h-10 rounded-full ml-3 object-cover"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t bg-white shadow">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => sendMessage(receiverId)}
          className="ml-2 bg-mypink text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
 </div>
  );
};

export default Chat;
