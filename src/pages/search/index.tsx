import React from "react";
import {connect} from 'react-redux'
import styles from './style.module.scss';

interface SearchFace {
  value:string,
  onChange:any,
  clickToSearchIcon:any
}
export const Search: React.FC<SearchFace> = (props): React.ReactElement => {
  const {value, onChange, clickToSearchIcon} = props;
  return (
    <div className={styles.searchmaincomponent}>
      <div className={styles.searchinputcontainer}>
        <input placeholder="Search Notes..." value={value} onChange={onChange} />
      </div>
      <div className={styles.searchbutton} onClick={clickToSearchIcon}>
        <i className="fa fa-search" />
      </div>
    </div>
  );
};