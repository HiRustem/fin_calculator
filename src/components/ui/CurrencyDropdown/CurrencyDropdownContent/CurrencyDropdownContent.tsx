import clsx from "clsx";
import styles from "./CurrencyDropdownContent.module.scss";

interface ICurrencyDropdownContent {
  options: string[];
  onSelect: (value: string) => void;
}

const CurrencyDropdownContent = ({
  options,
  onSelect,
}: ICurrencyDropdownContent) => {
  return (
    <ul className={clsx(styles.list)}>
      {options.map((option) => (
        <li key={option} className={styles.item}>
          <button className={styles.button} onClick={() => onSelect(option)}>
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CurrencyDropdownContent;
