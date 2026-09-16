import { useCallback, useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export function useUserProfile(uid) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setProfile(null);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const ref = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      setProfile(snapshot.exists() ? snapshot.data() : null);
      setLoading(false);
    });

    return unsubscribe;
  }, [uid]);

  const updateProfile = useCallback(
    (fields) => {
      if (!uid) return Promise.reject(new Error('No hay un usuario activo.'));
      return updateDoc(doc(db, 'users', uid), fields);
    },
    [uid]
  );

  return { profile, loading, updateProfile };
}
