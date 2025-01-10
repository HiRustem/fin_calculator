import styles from "./Toggle.module.scss";
import clsx from "clsx";

export interface IToggle {
  activeTab: string;
  onClick: () => void;
  states: string[];
}

const Toggle = ({ states, activeTab, onClick }: IToggle) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toggle}>
        <span
          className={clsx(styles.indicator, {
            [styles.left]: activeTab === states[0],
            [styles.right]: activeTab === states[1],
          })}
        />
        <button
          className={clsx(styles.button, {
            [styles.active]: states[0] === activeTab,
          })}
          onClick={onClick}
        >
          <p className={styles.text}>{states[0]}</p>
        </button>
        <button
          className={clsx(styles.button, {
            [styles.active]: states[1] === activeTab,
          })}
          onClick={onClick}
        >
          <p className={styles.text}>{states[1]}</p>
        </button>
      </div>
    </div>
  );
};

export default Toggle;
