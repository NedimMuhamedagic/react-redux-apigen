/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
// / <reference types="react-scripts" />

/**
 * Response types
 */
declare namespace Api {
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
}

declare interface ApiError {
  data: {
    message: string;
  };
  status: Number;
  statusText: string;
}

interface ApiMetaResponse {}

type ApiReducer<T> = {
  fetchParams: Object;
  data: undefined | T;
  loading: boolean;
  error: ApiError;
  meta: ApiMetaResponse;
};

export interface ResponseTypings {
  get_todos: Todo[];
  get_todo: Todo;
}
