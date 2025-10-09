import { createContext, ReactNode, useState, useContext, useEffect } from "react";

type AppContextType = {
  userId: number;
  setUserId: (id: number) => void;
  pymeId: number;
  setPymeId: (id: number) => void;
  nomPyme: string;
  setNomPyme: (nom: string) => void;
  isSessionLoading: boolean;

}

//Creamos el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null); /// cambiar a nulo
  const [pymeId, setPymeId] = useState<number | null>(null); /// cambiar a nulo
  const [nomPyme, setNomPyme] = useState<string | null>(null); /// cambiar a nulo
  const [isSessionLoading, setIsSessionLoading] = useState(true)

  ////Codigo de rutas protegidas!!!
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {

      const storedUserId = localStorage.getItem('userId')
      const storedPymeId = localStorage.getItem('pymeId')
      const storedNomPyme = localStorage.getItem('nomPyme')


      if (storedUserId) setUserId(parseInt(storedUserId))
      if (storedPymeId) setPymeId(parseInt(storedPymeId))
      if (storedNomPyme) setNomPyme(storedNomPyme)
    }
    setIsSessionLoading(false)
  }, [])

  return (
    <AppContext.Provider value={{
      userId, setUserId, pymeId, setPymeId,
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