import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useSRMStore } from './store/srmStore';

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const { patients, doctors, queueToday, visits, operators, settings } = useSRMStore.getState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Error signing in anonymously:", error);
        }
      } else {
        setIsAuthReady(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    // Sync Patients
    const unsubPatients = onSnapshot(collection(db, 'patients'), (snapshot) => {
      const fbPatients = snapshot.docs.map(doc => doc.data() as any);
      useSRMStore.setState({ patients: fbPatients.length > 0 ? fbPatients : patients });
      
      // Seed initial data if empty
      if (snapshot.empty && patients.length > 0) {
        patients.forEach(p => setDoc(doc(db, 'patients', p.id), p));
      }
    });

    // Sync Doctors
    const unsubDoctors = onSnapshot(collection(db, 'doctors'), (snapshot) => {
      const fbDoctors = snapshot.docs.map(doc => doc.data() as any);
      useSRMStore.setState({ doctors: fbDoctors.length > 0 ? fbDoctors : doctors });

      if (snapshot.empty && doctors.length > 0) {
        doctors.forEach(d => setDoc(doc(db, 'doctors', d.id), d));
      }
    });

    // Sync Visits
    const unsubVisits = onSnapshot(collection(db, 'visits'), (snapshot) => {
      const fbVisits = snapshot.docs.map(doc => doc.data() as any);
      useSRMStore.setState({ visits: fbVisits.length > 0 ? fbVisits : visits });

      if (snapshot.empty && visits.length > 0) {
        visits.forEach(v => setDoc(doc(db, 'visits', v.id), v));
      }
    });

    // Sync Queue Today
    const today = new Date().toISOString().split('T')[0];
    const unsubQueue = onSnapshot(doc(db, 'queues', today), (docSnap) => {
      if (docSnap.exists()) {
        useSRMStore.setState({ queueToday: docSnap.data() as any });
      } else {
        // Seed initial queue if it matches today, else create empty
        const initialQ = queueToday.tanggal === today ? queueToday : {
          tanggal: today,
          currentNumber: 0,
          nextNumber: 1,
          totalHariIni: 0,
          menunggu: 0,
          selesai: 0,
          list: []
        };
        setDoc(doc(db, 'queues', today), initialQ);
      }
    });

    // Sync Operators
    const unsubOperators = onSnapshot(collection(db, 'operators'), (snapshot) => {
      const fbOperators = snapshot.docs.map(doc => doc.data() as any);
      useSRMStore.setState({ operators: fbOperators.length > 0 ? fbOperators : operators });
      if (snapshot.empty && operators.length > 0) {
        operators.forEach(op => setDoc(doc(db, 'operators', op.id), op));
      }
    });

    // Sync Settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        useSRMStore.setState({ settings: docSnap.data() as any });
      } else if (settings) {
        setDoc(doc(db, 'settings', 'global'), settings);
      }
    });

    // Sync Master Data
    const unsubMasterData = onSnapshot(collection(db, 'master_data'), (snapshot) => {
      const newMasterData: Record<string, any[]> = {};
      snapshot.docs.forEach(doc => {
        newMasterData[doc.id] = doc.data().records || [];
      });
      useSRMStore.setState({ masterData: newMasterData });
    });

    return () => {
      unsubPatients();
      unsubDoctors();
      unsubVisits();
      unsubQueue();
      unsubOperators();
      unsubSettings();
      unsubMasterData();
    };
  }, [isAuthReady]);

  return <>{children}</>;
};
