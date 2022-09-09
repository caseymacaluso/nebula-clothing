import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const onInputChange = evt => {
    const { name, value } = evt.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Try again");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
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
