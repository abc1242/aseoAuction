import { createContext, useState } from "react";

const SessionContext = createContext({
  inSession: false,
  sessionId: null,
});

export const SessionContextProvider = (props) => {
  const [inSession, setInSession] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const createSessionHandler = (sessionId) => {
    setInSession(true);
    setSessionId(sessionId);
  };

  const contextValue = {
    inSession: inSession,
    sessionId: sessionId,
    createSession: createSessionHandler,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
