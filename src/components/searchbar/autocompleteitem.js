import React from 'react';
import styles from './autocompleteitem.css';

const AutoCompleteItem = ({ formattedSuggestion }) => (
    <div className={styles.suggestionItem}> 
      <strong>{formattedSuggestion.mainText}</strong>{' '}
      <small className="text-muted">{formattedSuggestion.secondaryText}</small>
    </div>
);

export default AutoCompleteItem;