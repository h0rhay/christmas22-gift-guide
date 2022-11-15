import React, { createContext, useState, ReactNode } from "react";
import GlobalStyle from "styles/globalStyle";
import { commonAnalyticsValues } from "./analytics/eventTrackers/eventsConstants";

type IAppContext = {
  routeChanging: boolean;
  a11yMode: boolean;
  categoryName: string;
  categoryTitle: string | undefined;
  categoryId: number;
  setCategoryName: (categoryName: string) => void;
  setCategoryTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCategoryId: (id: number) => void;
  setRouteChanging: React.Dispatch<React.SetStateAction<boolean>>;
  setA11yMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AppContext = createContext<IAppContext>({
  routeChanging: false,
  a11yMode: false,
  categoryName: commonAnalyticsValues.HOMEPAGE_NAME,
  categoryTitle: undefined,
  categoryId: -1,
  setRouteChanging: () => {},
  setA11yMode: () => {},
  setCategoryName: () => {},
  setCategoryTitle: () => {},
  setCategoryId: () => {}
});

type IAppProvider = {
  children: ReactNode;
};

export const AppProvider = ({ children }: IAppProvider) => {
  const [routeChanging, setRouteChanging] = useState<boolean>(false);
  const [a11yMode, setA11yMode] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState<string | undefined>(
    undefined
  );

  const [categoryName, setCategoryName] = useState<string>('');
  const setCategoryHandler = (newCategoryName: string): void => {
    if (categoryName !== newCategoryName) {
      setCategoryName(newCategoryName);
    }
  }
  const [categoryId, setCategoryId] = useState<number>(-1);
  
  return (
    <AppContext.Provider
      value={{
        routeChanging,
        categoryName,
        categoryTitle,
        categoryId,
        setCategoryTitle,
        setCategoryName: setCategoryHandler,
        setCategoryId,
        setRouteChanging,
        a11yMode,
        setA11yMode,
      }}
    >
      <GlobalStyle isA11yMode={a11yMode} />
      {children}
    </AppContext.Provider>
  );
};
