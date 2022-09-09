// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import {
  // auth,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // useEffect(
  //   () => async () => {
  //     const response = await getRedirectResult(auth);
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   },
  //   []
  // );

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <div>Sign in Page</div>
      <button onClick={logGoogleUser}>Sign in w Google</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in w Google redirect
      </button> */}
    </div>
  );
};

export default SignIn;
