import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

// Default values for form fields, will use for state management
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields; // Destructure from formFields object

  const onInputChange = evt => {
    // Destructure from evt.target
    const { name, value } = evt.target;
    // spread other objects of state, and only update the state of the field with the matching name (i.e. email, password, etc.)
    setFormFields({ ...formFields, [name]: value });
  };

  // Function to reset the form fields after the form is submitted
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async evt => {
    // Prevents a page refresh on submit
    evt.preventDefault();
    // Does not proceed if password fields don't match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Try again");
      return;
    }

    try {
      // Destructures user from the createAuthUserWithEmailAndPassword function
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Creates a user document, but passes in the displayName as an additional argument
      // without, the displayName ends up being null, and so the document will not be created
      await createUserDocumentFromAuth(user, { displayName });
      // Resets form fields after document is created
      resetFormFields();
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert(
          "The email you specified is associated with an existing account. Try again."
        );
      }
      console.log(e);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account yet?</h2>
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
    </div>
  );
};

export default SignUpForm;
