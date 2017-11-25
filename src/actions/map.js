import { 
    ADDRESS_LOADING, 
    ADDRESS_LOADED,
    ADDRESS_FAILED
  } from 'constants/action-types';
  
  export const addressLoading = boolean => ({
    type: ADDRESS_LOADING,
    loading: boolean
  });

  export const addressLoaded = viewportData => ({
    type: ADDRESS_LOADED,
    viewportData: viewportData
  });

  export const addressFailed = boolean => ({
    type: ADDRESS_FAILED
  });