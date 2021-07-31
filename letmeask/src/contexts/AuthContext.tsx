import firebase from "firebase";
import { ReactNode, createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";

type User = {
  id : string,
  name: string,
  avatar: string;
}
type AuthContextType = {
  user : User | undefined, // inicialmente é tipado como undefined pq nao tem nenhum usuario logado
  signInWithGoogle: () => Promise<void> // toda função asincrona devolve uma Promise, e a promise nesse caso nao tem retorno
}
type AuthContextProviderProps ={
  children : ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider (props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { // Armazenar o estado de autenticação do usuario
      if(user){
        const {displayName, photoURL, uid} = user;
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider(); // faz a autenticação com a conta google
    const result = await auth.signInWithPopup(provider) // abre o pop-up da tela de autenticação
      if(result.user) {
        const {displayName, photoURL, uid} = result.user;
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }
  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>

  );
}