import { createContext, useEffect, useState } from 'react';
import route from 'next/router';
import firebase from '../../firebase/config';
import User from '../../model/User';
import Cookies from 'js-cookie';

interface AuthContextProps {
    user?: User;
    loginGoogle?: () => Promise<void>;
    login?: (email: string, password: string) => Promise<void>;
    signUp?: (email: string, password: string) => Promise<void>;
    logout?: () => void;
    loading?: boolean;
}

const AuthContext = createContext<AuthContextProps>({});

async function userNormalized(userFirebase: firebase.User): Promise<User> {
    const token = await userFirebase.getIdToken();
    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        imageUrl: userFirebase.photoURL
    }
}

function manageCookie(logged: boolean) {
    if(logged)
        Cookies.set('admin-template-auth', logged, {
            expires: 7
        });
    else
        Cookies.remove('admin-template-auth');

}

export function AuthProvider(props) {
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)

    const configSession = async (userFirebase) => {
        if(userFirebase?.email) {
            const user = await userNormalized(userFirebase);
            setUser(user);
            manageCookie(true);
            setLoading(false);

            return user.email;
        } else {
            setUser(null);
            manageCookie(false);
            setLoading(false);

            return false
        }
    }

    const loginGoogle = async () => {
        try {
            setLoading(true);
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
    
            if(await configSession(resp.user))
                route.push('/')
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            setLoading(true);
            await firebase.auth().signOut();
            await configSession(null)
        } finally {
            route.push('/authentication')
            setLoading(false);
        }
    }

    const login = async (email, password) => {
        try {
            setLoading(true);
            const resp = await firebase.auth().signInWithEmailAndPassword(email, password)
    
            if(await configSession(resp.user))
                route.push('/')
        } finally {
            setLoading(false);
        }
    }

    const signUp = async (email, password) => {
        try {
            setLoading(true);
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)
    
            if(await configSession(resp.user))
                route.push('/')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(Cookies.get('admin-template-auth')) {
            const cancel = firebase.auth().onIdTokenChanged(configSession);
            return () => cancel();
        } else
            setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loginGoogle,
            login,
            signUp,
            logout,
            loading
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;