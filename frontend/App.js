// App.js
import { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { io } from 'socket.io-client';

const socket = io('http://your-backend-url:5000');

export default function App() {
  const [screen, setScreen] = useState('interests');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Step 1: Select interests
  const handleInterests = (selectedInterests) => {
    socket.emit('set_interests', selectedInterests);
    setScreen('chat');
  };

  // Step 2: Send messages
  const sendMessage = () => {
    socket.emit('message', message);
    setMessages([...messages, message]);
    setMessage('');
  };

  return (
    <View>
      {screen === 'interests' ? (
        <InterestsScreen onSubmit={handleInterests} />
      ) : (
        <ChatScreen 
          messages={messages}
          message={message}
          onSend={sendMessage}
          onDisconnect={() => setScreen('interests')}
        />
      )}
    </View>
  );
}