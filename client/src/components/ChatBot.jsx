import { useState } from 'react';
import { Webchat, WebchatProvider, Fab, getClient } from '@botpress/webchat';

const clientId = import.meta.env.VITE_CHATBOT_CLIENT_ID; 

const configuration = {
  color: '#000',
};

export default function ChatBot() {
  const client = getClient({ clientId });
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WebchatProvider client={client} configuration={configuration}>
        <Fab onClick={() => setIsWebchatOpen(!isWebchatOpen)} />
        {isWebchatOpen && <Webchat />}
      </WebchatProvider>
    </div>
  );
}
