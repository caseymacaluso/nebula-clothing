import {
  BaseButton,
  GoogleButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";

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

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
