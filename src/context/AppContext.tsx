import { createContext, ReactNode, useState, useContext, useEffect } from "react";

type AppContextType = {
  nomPyme: string;
  token: string;
  setNomPyme: (nom: string) => void;
  isSessionLoading: boolean;

}

//Creamos el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [nomPyme, setNomPyme] = useState<string | null>(null); /// cambiar a nulo

  const [token, setToken] = useState<string | null>(null); /// cambiar a nulo
  const [isSessionLoading, setIsSessionLoading] = useState(true)

  ////Codigo de rutas protegidas!!!
  useEffect(() => {
    const sessionToken = localStorage.getItem('token');
    setToken(sessionToken)
    if (sessionToken) {

      const storedNomPyme = localStorage.getItem('nomPyme')
      if (storedNomPyme) setNomPyme(storedNomPyme)
    }
    setIsSessionLoading(false)
  }, [])

  return (
    <AppContext.Provider value={{
      token, setToken,
      nomPyme, setNomPyme, isSessionLoading
    }}>
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