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
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { from: receiverId, from1: profilpc, from2: email, from3: username, from4: senderusername, from5: senderprofilpc, from6: senderemail } = location.state;

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log('Current user:', user.uid);
      console.log('Chatting with:', receiverId);

      const unsubscribe = onSnapshot(
        query(
          collection(db, 'messages'),
          where('recipientUid', 'in', [user.uid, receiverId]),
          where('senderUid', 'in', [user.uid, receiverId]),
          orderBy('timestamp')
        ),
        snapshot => {
          const fetchedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log('Fetched messages:', fetchedMessages);
          setMessages(fetchedMessages);
          setLoading(false);
        },
        error => {
          console.error('Error fetching messages:', error);
        }
      );
      return () => unsubscribe();
    }
  }, [db, receiverId]);

  const sendMessage = async (recipientUid) => {
    if (inputMessage.trim() !== '') {
      const user = auth.currentUser;
      if (user) {
        try {
          await addDoc(collection(db, 'messages'), {
            senderUid: user.uid,
            recipientUid: recipientUid,
            sendermessage: inputMessage,
            timestamp: new Date(),
            senderprofilpc: senderprofilpc,
            recipientemail: email,
            senderusername: senderusername,
            recipientprofilpc: profilpc,
            recipientusername: username,
            senderemail: senderemail
          });
          setInputMessage('');
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    }
  };

  // Filter messages based on search query
  const filteredMessages = messages.filter(msg =>
    msg.sendermessage && msg.sendermessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <ChatHeader title={username} img={profilpc} />
      <div className="flex flex-col h-screen mt-20 mb-10">
        <div className="flex items-center mx-4 my-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mypink flex-grow"
          />
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-full absolute top-0 left-0 bottom-0 right-0">
              <i className="fas fa-spinner fa-spin text-mypink text-4xl"></i>
              <p className="text-mypink mt-2">Loading...</p>
            </div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map(msg => (
              <div key={msg.id} className={`flex items-start my-2 ${msg.senderUid === auth.currentUser.uid ? 'justify-end' : 'justify-start'}`}>
                {msg.senderUid !== auth.currentUser.uid && (
                  <img
                    src={profilpc}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                )}
                <div
                  className={`p-3 rounded-lg ${
                    msg.senderUid === auth.currentUser.uid
                      ? 'bg-mypink text-white'
                      : 'bg-gray-300 text-gray-900'
                  }`}
                >
                  <span className="font-bold">
                    {msg.senderUid === auth.currentUser.uid ? 'You' : username}
                  </span>
                  : {msg.sendermessage}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-full absolute top-0 left-0 bottom-0 right-0">
              <i className="fas fa-comment-slash text-mypink text-4xl"></i>
              <p className="text-mypink mt-2">No messages</p>
            </div>
          )}
        </div>
      </div>
      <footer className="fixed bottom-0 right-0 left-0">
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
      </footer>
    </div>
  );
};

export default Chat;