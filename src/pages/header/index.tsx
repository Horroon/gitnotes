import React from 'react';
import {Search} from '../search/index';
import logo from '../../assets/emumba-logo.png'
import styles from './style.module.scss';

export const Header:React.FC = ():React.ReactElement=>{
    return( 
            <nav className={styles.header}>
                <div className={styles.headingcontainer}>
                    <img src={logo} />
                </div>
                <div className={styles.searchcontainer}>
                    <Search />
                </div>
            </nav>
        )
}