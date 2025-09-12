import { createContext, ReactNode, useState, useContext } from "react";

type AppContextType ={
    userId: number;
    setUserId: (id: number) => void;
}

//Creamos el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
export const AppProvider = ({children}: {children: ReactNode}) => {
    const [userId, setUserId] = useState<number>(2);

    return (
        <AppContext.Provider value={{userId, setUserId}}>
            {children}
        </AppContext.Provider>
    )

}

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};