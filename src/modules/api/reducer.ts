import _ from 'lodash';
import { API, ApiAction } from './actions';
import { Endpoint } from './endpoints';
import { initApi } from './helpers/initApi';


export const INITIAL_STATE = initApi();

const apiReducer = (state = INITIAL_STATE, action: ApiAction) => {
  if (/^FETCH_START_/.test(action.type)) {
    const subReducer = _.camelCase(action.type.replace(API.FETCH_START, '')) as Endpoint;

    return {
      ...state,
      [subReducer]: {
        ...state[subReducer],
        fetchParams: action.payload,
        loading: true,
        error: null,
      },
    };
  }

  if (/^FETCH_SUCCESS_/.test(action.type)) {
    const subReducer = _.camelCase(action.type.replace(API.FETCH_SUCCESS, '')) as Endpoint;

    return {
      ...state,
      [subReducer]: {
        ...state[subReducer],
        loading: false,
        error: null,
        data: action.payload,
        meta: action.meta,
      },
    };
  }

  if (/^FETCH_FAILURE_/.test(action.type)) {
    const subReducer = _.camelCase(action.type.replace(API.FETCH_FAILURE, '')) as Endpoint;
    return {
      ...state,
      [subReducer]: {
        ...state[subReducer],
        loading: false,
        error: action.payload,
      },
    };
  }
  if (/^REMOVE_/.test(action.type)) {
    const subReducer = _.camelCase(action.type.replace(API.REMOVE, '')) as Endpoint;
    return {
      ...state,
      [subReducer]: {
        data: null,
        loading: false,
        error: null,
      },
    };
  }
  if (action.type === 'LOGOUT') {
    const newState = _.omit(INITIAL_STATE, 'products');
    newState.products = state.products;
    return newState;
  }
  return state;
};

export { apiReducer };

