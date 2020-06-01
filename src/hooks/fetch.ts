import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { apiActions } from '../modules/api/actions';
import { Endpoint } from '../modules/api/endpoints';
import { selectApiState } from '../modules/api/selectors';
import { ApiReducer } from '../react-app-env';

const useFetch = <T>(
  endpoint: Endpoint,
): [ApiReducer<T>, (data?: Record<string, string | object>) => void] => {
  const dispatch = useDispatch();
  const apiState = useSelector(selectApiState);

  const doFetch = (
    data: Record<string, string | object> = {}, meta?: Record<string, string | number | object>,
  ) => dispatch(apiActions.fetch(endpoint, data, meta));

  const response: ApiReducer<T> = apiState[_.camelCase(endpoint)];
  return [response, doFetch];
};

export { useFetch };

