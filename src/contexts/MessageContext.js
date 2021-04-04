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

const shortenLocationData = (location) => {
  const regex = /\w*.cmpl.*,/g;
  return location.match(regex)[0].slice(0, -1);
}

const initialMessage = [];

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(initialMessage);

  const addTextMessage = (string) => {
    const newMessageObj = createTextObj(string);
    setMessages((prevState) => [...prevState, newMessageObj]);
  }

  const addErrorMessage = ({ description, location }) => {
    const shortLocation = shortenLocationData(location);
    const newMessageObj = createErrorObj(description, shortLocation);

    setMessages((prevState) => [...prevState, newMessageObj]);
  }

  const clearMessages = () => {
    setMessages([createTextObj('Konsole geleert')]);
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