import React from "react";
import UserProfile from "./types/user";

export interface AppContextShape {
  user?: UserProfile | null;
}

export const AppContext = React.createContext<AppContextShape>({});
