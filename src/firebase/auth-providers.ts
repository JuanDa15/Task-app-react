import { GoogleAuthProvider, type UserCredential, signInWithPopup, type User, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from './config'
import { AUTH_ERRORS } from './authentication-errors'

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle(): Promise<any> {
  try {
    const result: UserCredential =
      await signInWithPopup(firebaseAuth, googleProvider)
    const user: User = result.user
    const { displayName, email, photoURL, uid } = user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}
export async function signInWithEmail(email: string, password: string): Promise<any> {
  try {
    const result: UserCredential =
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    const user: User = result.user
    const { displayName, email: emailResponse, photoURL, uid } = user
    return {
      ok: true,
      displayName,
      email: emailResponse,
      photoURL,
      uid
    }
  } catch (error: any) {
    return { ok: false, errorMessage: AUTH_ERRORS[error.code] }
  }
}
export async function registerUserWithEmail(email: string, password: string, displayName: string): Promise<any> {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
    const user = firebaseAuth.currentUser ?? null

    user !== null && await updateProfile(user, {
      displayName
    })

    return {
      ok: true,
      displayName: user?.displayName,
      email: user?.email,
      uid: user?.uid,
      photoURL: user?.photoURL
    }
  } catch (error: any) {
    return { ok: false, errorMessage: AUTH_ERRORS[error.code] }
  }
}

export async function signOutFirebase(): Promise<any> {
  try {
    await firebaseAuth.signOut()
    return { ok: true }
  } catch (error: any) {
    return { ok: false, errorMessage: AUTH_ERRORS[error.code] }
  }
}
