import { 
  ADDRESS_LOADING, 
  ADDRESS_LOADED,
  ADDRESS_FAILED
} from 'constants/action-types';

const initialState = {
  loading: false,
  error: false,
  viewport: {
    latitude: -37.8172289,
    longitude: 144.96150779999994,
    zoom: 14,
    bearing: 0,
    pitch: 0
  },
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case ADDRESS_LOADING:
      return { ...state, loading: true };
    case ADDRESS_LOADED:
      return { ...state, viewport: action.viewportData, loading: false };
    case ADDRESS_FAILED:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
