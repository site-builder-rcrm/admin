import React from "react";
import UserProfile from "./types/user";

export interface AppContextShape {
  session?: any;
}

export const AppContext = React.createContext<AppContextShape>({});
