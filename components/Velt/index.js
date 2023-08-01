import { VeltProvider, useVeltClient } from '@veltdev/react';
import { useEffect, useState } from 'react';

import Cursor from '../Cursor';

export default function Velt() {
  const { client } = useVeltClient();
  const [user, setUser] = useState();

  const [groupId, setGroupId] = useState();
  const [documentId, setDocumentId] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (client && user) {
      client.identify(user);
      client.setDocumentID(documentId);
      
      user.groupId = groupId;
    }
  }, [client, user]);

  useEffect(() => {
    setUser({
      uid: userId,
      name: 'Bob',
      email: 'benny@velt.dev',
      photoURL: 'https://fastly.picsum.photos/id/935/200/300.jpg?hmac=XPPjHEBtYb6Y3-p1EjAP0RRB0bNlvqCs52VIysO7iH0'
    });
  }, [userId]);

  useEffect(() => {
    setUserId(window.crypto.randomUUID());
    setGroupId(window.crypto.randomUUID());
    setDocumentId(window.crypto.randomUUID());
  }, []);
  
  return (
    <VeltProvider apiKey="zGgfrE0HzF3ppBiunMiF">
      <Cursor 
        documentId={documentId}
        client={client} 
        user={user}
      />
    </VeltProvider>
  );
}