import { BaseButton, GoogleButton, InvertedButton } from "./button.styles";

export const buttonTypeClasses = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = buttonTypeClasses.base) =>
  ({
    [buttonTypeClasses.base]: BaseButton,
    [buttonTypeClasses.google]: GoogleButton,
    [buttonTypeClasses.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
