import { Action } from 'redux';
import { put, takeEvery } from 'redux-saga/effects';
import { ApiError } from '../../react-app-env';
import { API, ApiAction, apiActions } from './actions';
import { Endpoint } from './endpoints';
import { api } from './helpers/api';

export function* onApiLoad({ payload, type, meta }: ApiAction) {
  const actionType = type
    .replace(API.FETCH_START, '')
    .toLowerCase() as Endpoint;
  try {
    const response = yield api.fetch(
      actionType,
      payload as object,
    );
    yield put(
      apiActions.fetchSuccess(actionType, response.data, meta),
    );
  } catch (e) {
    const err = {
      data: {
        message: e.message as string,
      },
      status: e.status || 500,
      statusText: e.message,
    } as ApiError;
    yield put(
      apiActions.fetchFailure(actionType, err, meta),
    );
  }
}

export function* watchApiLoad() {
  yield takeEvery(
    (action: Action) => /^FETCH_START_/.test(action.type),
    onApiLoad,
  );
}

export default [watchApiLoad];
