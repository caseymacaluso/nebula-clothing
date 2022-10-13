import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from "firebase/auth";
// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";
import { signUpStart } from "../../store/user/user.action";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer, SignUpTitle } from "./sign-up-form.styles";

// Default values for form fields, will use for state management
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields; // Destructure from formFields object

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // Destructure from evt.target
    const { name, value } = evt.target;
    // spread other objects of state, and only update the state of the field with the matching name (i.e. email, password, etc.)
    setFormFields({ ...formFields, [name]: value });
  };

  // Function to reset the form fields after the form is submitted
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    // Prevents a page refresh on submit
    evt.preventDefault();
    // Does not proceed if password fields don't match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Try again");
      return;
    }

    try {
      // Destructures user from the createAuthUserWithEmailAndPassword function
      // const { user } = await createAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );

      // // Creates a user document, but passes in the displayName as an additional argument
      // // without, the displayName ends up being null, and so the document will not be created
      // await createUserDocumentFromAuth(user, { displayName });

      dispatch(signUpStart(email, password, displayName));
      // Resets form fields after document is created
      resetFormFields();
    } catch (e) {
      if ((e as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert(
          "The email you specified is associated with an existing account. Try again."
        );
      }
      console.log(e);
    }
  };

  return (
    <SignUpContainer>
      <SignUpTitle>Don't have an account yet?</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={onInputChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          required
          type="email"
          onChange={onInputChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={onInputChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={onInputChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
