import { ButtonHTMLAttributes, ReactNode } from "react";

import clsx from "clsx";
import styles from "./Button.module.scss";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode;
  className?: string;
}

const Button = ({ text, icon, className, ...props }: IButton) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      <span className={styles.iconWrapper}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
