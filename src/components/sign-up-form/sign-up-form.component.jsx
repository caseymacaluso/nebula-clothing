import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          required
          type="text"
          onChange={onInputChange}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input
          required
          type="email"
          onChange={onInputChange}
          name="email"
          value={email}
        />
        <label>Password</label>
        <input
          required
          type="password"
          onChange={onInputChange}
          name="password"
          value={password}
        />
        <label>Confirm Password</label>
        <input
          required
          type="password"
          onChange={onInputChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
