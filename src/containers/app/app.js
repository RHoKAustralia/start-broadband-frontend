import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadApp } from 'actions/app';
import SearchBar from '../../components/searchbar/searchbar';
import Nav from '../../components/nav/nav';

import Image from '../../assets/shocked-guy-desk.jpg';

import styles from './app.css';

type Props = {
  dispatch: () => void,
  loaded: boolean
}

export class AppContainer extends Component {
  componentDidMount() {
    this.props.dispatch(loadApp());
  }

  props: Props;

  render() {
    if (!this.props.loaded) {
      return (
        <div className={styles.loaderContainer}>
          <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
        </div>
      );
    }

    return (
      <div>
      <Nav />
      <div className={styles.container}>
        <h1 styles={styles.ctaHeader}>Feel the need for NBN speed?</h1>
        <h2 styles={styles.ctaSubheader}>Want to know what's available? Stay<br /> in the know with the Start Broadband<br />NBN Checker</h2>
          {/*<p className={styles.ctaContent}>Lorem ipsum dolor sit amet, consectetur <br />
          adipiscing elit. Maecenas non erat velit. <br />
          Fusce blandit arcu est, id auctor tortor mattis
          </p> */}
          <SearchBar />
      </div>

      <img src={Image} className={styles.ctaImage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.app.loaded
});

export default connect(mapStateToProps)(AppContainer);
