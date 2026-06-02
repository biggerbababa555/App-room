const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { useChat } = require('@ai-sdk/react');

function Test() {
  const chat = useChat();
  console.log("sendMessage:", chat.sendMessage.toString());
  return null;
}
renderToStaticMarkup(React.createElement(Test));
