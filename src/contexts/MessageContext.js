import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

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
  const regex = /\w+\.\w+:\d*\.\d*(-\d*(\.\d*)?)?/g;
  return location.match(regex)[0];
}

const initialMessage = [];
const initialConsoleHightInPx = 200;

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(initialMessage);
  const [hightCache, setHightCache] = useState(initialConsoleHightInPx);

  const updateHightCache = (newHight) => {
    setHightCache(newHight);
  }

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
      hightCache,
      updateHightCache,
    }}>
      {children}
    </Provider>
  )
}
MessageProvider.propTypes = {
  children: PropTypes.element,
}

const useMessageContext = () => useContext(MessageContext);

export { MessageProvider, useMessageContext }