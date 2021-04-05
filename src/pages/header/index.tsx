import React from 'react';
import {Search} from '../search/index';
import logo from '../../assets/emumba-logo.png'
import {UserInfo} from '../userinfo/index';
import styles from './style.module.scss';

export const Header:React.FC = ():React.ReactElement=>{
    return( 
            <nav className={styles.header}>
                <div className={styles.headingcontainer}>
                    <img src={logo} />
                </div>
                <div className={styles.searchcontainer}>
                    <Search />

                    <div>
                        <UserInfo isLoggedIn={false} img={'http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/12/Profile-Picture-4.jpg'}/>
                    </div>
                </div>
            </nav>
        )
}