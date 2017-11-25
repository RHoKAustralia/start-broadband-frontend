import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapGL, { Marker, Popup, experimental } from 'react-map-gl';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import querystring from 'querystring';
import { Motion, spring } from 'react-motion';

import { loadApp } from 'actions/app';
import { selectAddress } from 'actions/map';
import SearchBar from '../../components/searchbar/searchbar';
import Pin from '../../components/pin/pin';
import Nav from '../../components/nav/nav';
import SecondaryNav from '../../components/secondarynav/secondarynav';
import Footer from '../../components/footer/footer';
import Logo from '../../assets/main-logo.png';
import PopupContainer from '../../components/PopupContainer/popupcontainer';

import styles from './search.css';

// const MAPBOX_TOKEN = 'pk.eyJ1IjoibGVudGluaWZhbmNsdWIiLCJhIjoiY2phY2RqdGZ6MDkxZjJ3cXVpd24wN204eSJ9.6LBgvCcOS1Qih8QsDhMDqA';

const MAPBOX_TOKEN = process.env.MAPBOX_API_KEY;

type Props = {
  dispatch: () => void,
  loaded: boolean
}

export class AppContainer extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
        lat: -37.8172289,
        lng: 144.96150779999994,
        viewport: {
            zoom: 16,
            bearing: 0,
            pitch: 0,
            width: 500,
            height: 500,
          },
          popupInfo: null,
          isLoading: false
    }
  }

  geocode(params) {
    this.setState({isLoading: true});
    if(params['address']) {
      geocodeByAddress(params['address'])
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ lat: latLng.lat, lng: latLng.lng, isLoading: false}))
      .catch(error => {
        console.error('Error', error);
        this.setState({isLoading: false});
      });
    }
  }

  componentWillMount() {
    const params = querystring.parse(window.location.search.slice(1));
    this.geocode(params);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.search !== window.location.search) {
      const params = querystring.parse(nextProps.location.search.slice(1));
      this.geocode(params);
    }
  }

  componentDidMount() {
    this.props.loadApp();
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _onViewportChange = viewport => this.setState({
    viewport: {...this.state.viewport, ...viewport}
  });

  _goToViewport = ({longitude, latitude}) => {
    this._onViewportChange({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: experimental.viewportFlyToInterpolator,
      transitionDuration: 5000
    });
  };

  props: Props;

  render() {
    if (!this.props.loaded) {
      return (
        <div className={styles.loaderContainer}>
        <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
        </div>
      );
    }

    const { viewport, lat, lng} = this.state;

    return (
      <div className={styles.container}>
      <Nav header='Check if NBN is available at your address'></Nav>
      <div className={styles.searchbarWrapper}>
        <SearchBar padding={false} />
      </div>

      { /* this.state.isLoading &&
        <div className={styles.loaderContainer}>
        <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
        </div> */
      }
        <Motion style={{
          latitude: spring(viewport.latitude, { stiffness: 150, damping: 50, precision: 0.000001 }),
          longitude: spring(viewport.longitude, { stiffness: 150, damping: 50, precision: 0.000001 })
        }}>
        {({ latitude, longitude }) => <MapGL
          {...viewport}
          latitude={lat}
          longitude={lng}
          mapStyle="mapbox://styles/mapbox/light-v9"
          onViewportChange={this._goToViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          dragToRotate={false}
          scrollZoom={false}
          dragPan={false}
          >
            <Marker key={`marker-home`}
              longitude={this.state.lng}
              latitude={this.state.lat}>
              <Pin size={40} />
            </Marker>

            <Popup tipSize={5}
            anchor="top"
            offsetTop={20}
            offsetLeft={-6}
            closeButton={false}
            longitude={this.state.lng}
            latitude={this.state.lat}>
            <PopupContainer image={Logo} />
          </Popup>
        </MapGL>
      }
        </Motion>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.app.loaded,
  map: state.map
});

const mapDispatchToProps = dispatch => ({
  selectAddress: (address) => dispatch(selectAddress(address)),
  loadApp: () => dispatch(loadApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
