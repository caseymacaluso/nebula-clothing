import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { buttonTypeClasses } from "../button/button.component";
import {
  SignInContainer,
  ButtonsContainer,
  SignInTitle,
} from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  const onInputChange = evt => {
    // Destructure from evt.target
    const { name, value } = evt.target;
    // spread other objects of state, and only update the state of the field with the matching name (i.e. email, password, etc.)
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async evt => {
    evt.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Password entered is incorrect. Try again");
          break;
        case "auth/user-not-found":
          alert(
            "There does not appear to be an existing account with that email address."
          );
          break;
        default:
          console.log(error.message);
      }
    }
  };

  return (
    <SignInContainer>
      <SignInTitle>Already have an account?</SignInTitle>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email Address"
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
        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType={buttonTypeClasses.google}
            onClick={logGoogleUser}>
            Sign in with Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
