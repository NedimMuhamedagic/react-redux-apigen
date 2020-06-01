import _ from 'lodash';
import { v4 } from 'uuid';

const environment = process.env.NODE_ENV || 'development';

const isWindows = navigator.platform.indexOf('Win') > -1;

interface ConfigShape {
  isWindows?: boolean;
  environment: typeof environment,
  run?: string,
  endpoints: {
    api?: string;
  };
  keys: Record<string, string>
}

const configs = {
  common: {
    isWindows,
    environment,
    run: v4(), // Unique ID for the duration of this app run
    endpoints: {},
    keys: {
      tokenServiceKey: '@@TOKEN',
    },
  },
  development: {
    environment,
    endpoints: {
      api: 'https://jsonplaceholder.typicode.com',
    },
    keys: {},
  },
  production: {
    environment,
    endpoints: {
      api: 'https://jsonplaceholder.typicode.com',
    },
    keys: {},
  },
  test: {
    environment,
    endpoints: {
      api: '',
    },
    keys: {},
  },
};

const configuration = _.merge(configs.common, _.get(configs, environment, {})) as ConfigShape;

export default configuration;
