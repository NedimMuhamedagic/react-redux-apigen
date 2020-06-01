export interface IAction<T extends string> {
  type: T;
}

export interface IActionWithPayload<T extends string, P, M> extends IAction<T> {
  payload: P;
  meta: M;
}

export function createAction<T extends string>(type: T): IAction<T>;
export function createAction<T extends string, P, M>(
  type: T,
  payload: P,
  meta?: M
): IActionWithPayload<T, P, M>;

export function createAction<T extends string, P, M>(
  type: T,
  payload?: P,
  meta?: M
): IAction<T> | IActionWithPayload<T, P, M> {
  return payload === undefined ? { type } : { type, payload, meta };
}

type FunctionType = (...args: any[]) => any;

interface IActionCreatorsMapObject {
  [actionCreator: string]: FunctionType;
}

export type ActionsUnion<A extends IActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;
