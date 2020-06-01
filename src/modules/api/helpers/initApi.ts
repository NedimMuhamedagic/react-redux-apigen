import _ from 'lodash';
import { ApiReducer } from '../../../react-app-env';
import { ENDPOINTS } from '../endpoints';

const initApi = () => {
  const reducers: Record<string, ApiReducer<{}>> = {};
  Object.keys(ENDPOINTS).forEach((endpointKey) => {
    const reducer = {
      data: null,
      loading: false,
      error: null,
    };

    Object.assign(reducers, { [_.camelCase(endpointKey)]: reducer });
  });

  return reducers;
};

export { initApi };

