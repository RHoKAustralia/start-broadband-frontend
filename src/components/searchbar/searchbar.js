import React, { PureComponent } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { withRouter } from 'react-router-dom';
import AutoCompleteItem from './autocompleteitem';

import styles from './searchbar.css';

class SearchBar extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        address: '',
      };

      this.handleSelect = this.handleSelect.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.formSubmit = this.formSubmit.bind(this);
    }

    handleChange(address) {
      this.setState({
        address
      })
    }

    handleSelect(address) {
      console.log(address);
      this.props.history.push(`/search?address=${address}`);
    }

    formSubmit(e) {
      e.preventDefault();
      this.handleSelect(this.state.address);
    }
  
    render() {
      const inputProps = {
        value: this.state.address,
        onChange: this.handleChange,
        placeholder: 'Enter your address here'
      }

      return (
        <div>
          <form className={styles.searchbarWrapper} onSubmit={this.formSubmit}>
              <div className={styles.searchbarWrapperContainer}>
              <PlacesAutocomplete 
                  inputProps={inputProps} 
                  onSelect={this.handleSelect}
                  autocompleteItem={AutoCompleteItem}
                  classNames={{ input: styles.searchbarInput}}
              />
              </div>
              <button type="submit" className={styles.fontIcon}>
              <i className="fa fa-search" aria-hidden="true"></i>
              </button>
          </form>
        </div>
      )
    }
  }
  
  export default withRouter(SearchBar);