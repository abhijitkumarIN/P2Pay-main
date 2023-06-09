import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client';
import React, { createContext, useContext, useEffect } from 'react';

import { environment } from '@kleeen/environment';
import { useAutoRefresh } from './useAutoRefresh';
import { useKleeenActions } from './useKleeenActions';
import { useKleeenContext } from './useKleeenContext';
import { v4 as uuidv4 } from 'uuid';

const { middlewareAPI, socketOptions } = environment.settings;

// Here is the base where the socket will be connected
const WS_BASE = middlewareAPI;

// Here are the socket configuration, in case persistent calls are needed the value of autoConnect must be true
const WS_OPTIONS: Partial<ManagerOptions & SocketOptions> = socketOptions || {
  autoConnect: false,
};

export const WebSocketContext: React.Context<{
  socket?: Socket;
}> = createContext({});

let socket: Socket;

export function useWebSocket() {
  const webSocketContext = useContext(WebSocketContext);
  return webSocketContext;
}

export const WebSocketProvider = ({ children }) => {
  let ws: { socket: Socket };
  const { currentUser } = useKleeenContext('endUser');
  const { autoRefreshSource } = useAutoRefresh();
  const { addNotification } = useKleeenActions('ksNotifications');

  useEffect(() => {
    if (!socket) {
      socket = io(WS_BASE, WS_OPTIONS);

      socket.on('event://notification', (msg) => {
        addNotification({
          key: uuidv4(),
          notification: {
            message: {
              'data-testid': msg?.success ? 'success-notification' : 'error-notification',
              actions: msg?.actions,
              message: msg?.customMessage,
              taskName: msg?.taskName,
              title: msg?.customTitle,
              variant: msg?.success ? 'success' : 'error',
            },
            options: {
              key: uuidv4(),
              persist: true,
            },
          },
        });
      });

      socket.on('event://auto-refresh', (msg: string | string[]) => {
        autoRefreshSource.next(msg);
      });
    }

    return () => {
      socket.emit('event://user-disconnected', currentUser?.username);
    };
  }, []);

  useEffect(() => {
    if (socket && currentUser?.username) {
      socket.emit('event://user-connected', currentUser?.username);
    }
  }, [socket, currentUser?.username]);

  ws = {
    socket,
  };

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};
