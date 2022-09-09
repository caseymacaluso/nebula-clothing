import { useState } from "react";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const onInputChange = evt => {
    const { name, value } = evt.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => {}}>
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
