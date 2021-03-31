import React, { useContext, useState } from 'react';

const MessageContext = React.createContext();
const { Provider } = MessageContext;

const MESSAGE_TYPES = Object.freeze({
  text: 'text',
  error: 'error'
})


const createTextObj = (string) => {
  return {
    type: MESSAGE_TYPES.text,
    content: string,
  }
}

const createErrorObj = (description, location) => {
  return {
    type: MESSAGE_TYPES.error,
    content: {
      description: description,
      location: location,
    },
  }
}


const initialMessage = [];

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(initialMessage);

  const addTextMessage = (string) => {
    const newMessageObj = createTextObj(string);
    setMessages((prevState) => [...prevState, newMessageObj]);
  }

  const addErrorMessage = ({ description, location }) => {
    const newMessageObj = createErrorObj(description, location);
    setMessages((prevState) => [...prevState, newMessageObj]);
  }

  const clearMessages = () => {
    setMessages('');
  }

  return(
    <Provider value={{
      messages,
      addTextMessage,
      addErrorMessage,
      clearMessages,
    }}>
      {children}
    </Provider>
  )
}

const useMessageContext = () => useContext(MessageContext);

export { MessageProvider, useMessageContext }