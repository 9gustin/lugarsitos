import {useContext} from "react";

import { SessionContext } from "./context";

export const useSession = () => {
  const context = useContext(SessionContext);

  if(!context) {
    throw new Error("Must use SessionContext within SessionProvider")
  }

  return context;
}
