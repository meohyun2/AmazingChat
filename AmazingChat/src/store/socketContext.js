import React,{createContext} from 'react';
import * as io from 'socket.io-client'

export const SocketContext = createContext();

//initialize Socket
var chatServerURL = "https://amazingchatapi.run.goorm.io";
var allowedOrigins = "https://amazingchat.run.goorm.io";

const socket = io(chatServerURL,{origins: allowedOrigins,transports: ['websocket']});
	

export const SocketContextProvider = (props) => (
  <SocketContext.Provider value={socket}>
    {props.children}
  </SocketContext.Provider>
)