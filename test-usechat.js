const { useChat } = require('@ai-sdk/react');
// this is a react hook, we can't just call it in node easily due to React internals, 
// but we can try if it doesn't use hooks immediately or we can mock it
