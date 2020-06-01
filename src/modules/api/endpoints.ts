// All endpoints must be in snake case (snake_case)
export interface EndpointShape {
  uri: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  formEncoded?: boolean;
}

const ENDPOINTS = {
  get_posts: {
    uri: '/posts',
    method: 'GET',
  },
  get_post: {
    uri: '/post/{id}',
    method: 'GET',
  },
};

export type Endpoint = keyof typeof ENDPOINTS;

export { ENDPOINTS };

