import React, {PureComponent} from 'react';
import styles from './popupcontainer.css';

export default class PopupContainer extends PureComponent {

  render() {
    return (
      <div className={styles.popupContainer}>
        <div>Tech Type <span className={styles.floatRight}>Tech Type</span></div>
        <div>Likely Speed <span className={styles.floatRight}>Likely Speed</span></div>
        <div>Likely Speed <span className={styles.floatRight}>Likely Speed</span></div>
        <div>Likely Speed <span className={styles.floatRight}>Likely Speed</span></div>
      </div>
    );
  }
}