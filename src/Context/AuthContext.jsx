import { auth } from "../firebase/firebase.Config";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // listen to auth state
    onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
    });

    // 🔐 Google Sign-In
    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    }
    const logOutUser = () => {
        return auth.signOut();
    }

    //manage User
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const { email, displayName, photoURL } = user;
                const userData = {
                    email, userName: displayName, photo: photoURL
                }
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])



    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOutUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
