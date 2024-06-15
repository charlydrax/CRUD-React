import { createContext, useState, useEffect } from "react";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"
import {auth} from "../firebase-config"
export const UserContext = createContext()

export function UserContextProvider(props) {

    const signUp = (email,pwd) => createUserWithEmailAndPassword(auth, email, pwd)


    const signIn = (email,pwd) => signInWithEmailAndPassword(auth, email, pwd)


    const [currentUser, setCurrentUser] = useState();
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() =>{

        const unsubscribe =  onAuthStateChanged( auth, (currentUser)=> {
            //vérifie si un utilisateur existe déjà
            setCurrentUser(currentUser)
            setLoadingData(false)//permet d'attendre l'information avant de lancer l'application
        })

        return unsubscribe;
    }, [])

    const [modalState, setModalState] = useState({
        SignUpModal: false,
        SignInModal: false
    })
    const toggleModals = modal => {
        if(modal === "signIn") {
            setModalState({
                SignUpModal: false,
                SignInModal: true
            })
        }
        if(modal === "signUp") {
            setModalState({
                SignUpModal: true,
                SignInModal: false
            })
        }
        if(modal === "close") {
            setModalState({
                SignUpModal: false,
                SignInModal: false
            })
        }
    }

    return(
        <UserContext.Provider value={{modalState, toggleModals, signUp, signIn, currentUser}}>
            {!loadingData && props.children}
            {/* seulement quand on a les données, on envoie notre application */}
        </UserContext.Provider>
    )
}