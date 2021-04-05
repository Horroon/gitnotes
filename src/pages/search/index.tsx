import React from "react";
import styles from './style.module.scss';

export const Search: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.searchmaincomponent}>
      <div className={styles.searchinputcontainer}>
        <input />
      </div>
      <div className={styles.searchbutton}>
        <i className="fa fa-search" />
      </div>
    </div>
  );
};
