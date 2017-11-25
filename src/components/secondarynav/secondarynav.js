import React, { PureComponent } from 'react';

import styles from './secondarynav.css';

const SecondaryNav = (props: Props) =>
<div className={styles.navbar}>
    {props.children}
</div>;

export default SecondaryNav;