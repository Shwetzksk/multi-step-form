import React, {createContext, useReducer} from "react";
import {Action, formReducer, initialValue} from "./util";

export const ReadContext = createContext(initialValue);
export const DispatchContext = createContext<React.Dispatch<Action> | null>(null);

const ContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [formData, dispatch] = useReducer(formReducer, initialValue);

  return (
    <ReadContext.Provider value={formData}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </ReadContext.Provider>
  );
};
export default ContextProvider;
