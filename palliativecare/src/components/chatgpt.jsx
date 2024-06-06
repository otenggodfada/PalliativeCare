import { AiChat } from '@nlux/react';
import { useChatAdapter } from '@nlux/nlbridge-react';
import { streamAdapter } from '../service/adapter';
import { user , assistantAvatar} from '../utils/personas';
import '@nlux/themes/nova.css';
import { readUserinfo } from '../service/databasefirebase';
import { auth } from '../service/firebaseservice';
import { useEffect, useState } from 'react';
const ChatOne =() =>{
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        readUserinfo(setUserData);
      } else {
        setUserData({});
      }
    });

    return () => unsubscribe();
  }, []);
  return (
  
    <AiChat className=' overflow-hidden'
    adapter={streamAdapter}
    personaOptions={{
      assistant: {
        name: 'Palliative Care',
        tagline: 'Your Genius AI Doctor',
        avatar: assistantAvatar
      },
 user: {name:userData.username, avatar: userData.profilpc}
    }}
    composerOptions={{
      placeholder: 'Ask doctor about symptoms'
    }}
    displayOptions={{
      height: 400, maxWidth: 430,
      colorScheme: 'dark'
    }}
  />
 
  );
};
export default ChatOne;