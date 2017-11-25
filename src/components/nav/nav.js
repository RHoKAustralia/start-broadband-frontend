import React, { PureComponent } from 'react';
import Logo from '../../assets/main-logo.png';

import styles from './nav.css';

const Nav = (props) =>
<div className={styles.container}>
    <nav className={styles.navbar}>
    <a href="/"><img src={Logo} className={styles.logo} /></a>
    <span className={styles.navHeader}>{props.header}</span>
    <a className={styles.navHeaderMobile} href="https://www.startbroadband.com.au/">Visit Website</a>
    </nav>
    {props.children}
</div>;

export default Nav;
