import React from "react";
import { Header } from "./header/index";
import { Gists } from "./gists/index";
import styles from "./style.module.scss";

export const MainScreen: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.mainscreencontainer}>
      <div className={styles.headercontainer}>
        <Header />
      </div>
      <div className={`${styles.mainbody} container`}>
        <Gists />
      </div>
    </div>
  );
};
