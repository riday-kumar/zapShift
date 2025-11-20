import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.config";
import { useEffect, useState } from "react";

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update user Profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //google login
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // set observer to see user have or not
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const value = {
    registerUser,
    signInUser,
    logOut,
    googleLogIn,
    currentUser,
    loading,
    updateUserProfile,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};
