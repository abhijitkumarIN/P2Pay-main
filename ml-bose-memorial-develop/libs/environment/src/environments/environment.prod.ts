export const environment = {
  production: true,
  middlewareAPI: 'http://localhost:3000',
  // Here are the socket configuration, in case persistent calls are needed the value of autoConnect must be true
  socketOptions: {
    autoConnect: false,
  },
};
