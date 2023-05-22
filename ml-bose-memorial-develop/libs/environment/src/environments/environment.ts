// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  middlewareAPI: 'http://localhost:3000',
  // Here are the socket configuration, in case persistent calls are needed the value of autoConnect must be true
  socketOptions: {
    autoConnect: true,
  },
};
