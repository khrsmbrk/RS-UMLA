import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import firebaseConfig from "../../../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void,
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (!isSigningIn) {
        let dummyToken = "internal-sso-token";
        try {
          dummyToken = await user.getIdToken();
        } catch (e) {}
        if (onAuthSuccess) onAuthSuccess(user, dummyToken);
      }
    } else {
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const internalSsoSignIn = async (
  email: string,
  password: string,
  rememberMe: boolean = true,
): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    let userRecord: User;

    // Set persistence before signing in
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence,
    );

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      userRecord = result.user;
    } catch (e: any) {
      // Auto register for demo purposes if account doesn't exist
      if (
        e.code === "auth/user-not-found" ||
        e.code === "auth/invalid-credential"
      ) {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        userRecord = result.user;
      } else {
        throw e;
      }
    }

    let token = "internal-sso-token";
    try {
      token = await userRecord.getIdToken();
    } catch (e) {}

    return { user: userRecord, accessToken: token };
  } catch (error: any) {
    console.error("Sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (auth.currentUser) {
    try {
      return await auth.currentUser.getIdToken();
    } catch (e) {
      return "internal-sso-token";
    }
  }
  return null;
};

export const logout = async () => {
  await auth.signOut();
};
