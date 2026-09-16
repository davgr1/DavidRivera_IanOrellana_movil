import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const login = useCallback((email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const register = useCallback(async (email, password, profile) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', credential.user.uid), {
      ...profile,
      email,
      createdAt: serverTimestamp(),
    });
    return credential;
  }, []);

  const logout = useCallback(() => signOut(auth), []);

  const value = { user, initializing, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
