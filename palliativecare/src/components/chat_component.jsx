import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { auth } from '../service/firebaseservice'; // Assuming this imports Firebase Auth
import { useLocation } from 'react-router-dom';
import ChatHeader from './chathearder';

const Chat = () => {
  const db = getFirestore();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
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
          setLoading(false); // Set loading to false after data is fetched
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
      <ChatHeader title={username} img={profilpc} />
      <div className="flex flex-col h-screen mt-20">
        <div className="flex-grow overflow-y-auto p-4">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-full">
              <i className="fas fa-spinner fa-spin text-mypink text-4xl"></i>
              <p className="text-mypink mt-2">Loading...</p>
            </div>
          ) : messages.length > 0 ? (
            messages.map(msg => (
              <div key={msg.id} className={`flex items-start my-2 ${msg.senderUid === auth.currentUser.uid ? 'justify-end' : 'justify-start'}`}>
                {msg.senderUid !== auth.currentUser.uid && (
                  <img
                    src={profilpc}
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
                    {msg.senderUid === auth.currentUser.uid ? 'You' : username}
                  </span>
                  : {msg.message}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <i className="fas fa-comment-slash text-mypink text-4xl"></i>
              <p className="text-mypink mt-2">No messages</p>
            </div>
          )}
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
