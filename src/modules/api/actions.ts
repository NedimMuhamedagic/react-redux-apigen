import { ApiError } from '../../react-app-env';
import { ActionsUnion, createAction } from '../action';
import { Endpoint } from './endpoints';

enum API {
  FETCH_START = 'FETCH_START_',
  FETCH_SUCCESS = 'FETCH_SUCCESS_',
  FETCH_FAILURE = 'FETCH_FAILURE_',
  REMOVE = 'REMOVE_'
}

const apiActions = {
  fetch: <T, M>(endpoint: Endpoint, data: T, meta?: M) => {
    const actionType = `${API.FETCH_START}${endpoint.toUpperCase()}`;

    return createAction(actionType, data, meta);
  },
  fetchSuccess: <TS, MS>(endpoint: Endpoint, data: TS, meta: MS) => {
    const actionType = `${API.FETCH_SUCCESS}${endpoint.toUpperCase()}`;
    return createAction(actionType, data, meta);
  },
  fetchFailure: <ME>(endpoint: Endpoint, data: ApiError, meta: ME) => {
    const actionType = `${API.FETCH_FAILURE}${endpoint.toUpperCase()}`;
    return createAction(actionType, data, meta);
  },
  remove: (endpoint: Endpoint) => {
    const actionType = `${API.REMOVE}${endpoint.toUpperCase()}`;
    return createAction(actionType, null);
  },
};

export type ApiAction = ActionsUnion<typeof apiActions>;
export { API, apiActions };

