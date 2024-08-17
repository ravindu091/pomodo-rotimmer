import React from "react";
import '../firebase/firebase.js'
import { getAuth, signInWithPopup, GoogleAuthProvider,getAdditionalUserInfo } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { redirect } from "react-router-dom";
const provider = new GoogleAuthProvider();
const auth = getAuth();
export default function Login() {

const popupLogin = async ()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log(getAdditionalUserInfo(result));
    console.log(user);
    redirect('/dashboard')
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error);
    // ...
  });
    }

    return(
        <div>
            <button className="px-4 py-3 rounded-sm bg-blue-700 hover:bg-blue-800" onClick={popupLogin}>Log in</button>
        </div>
    )
}