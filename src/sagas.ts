import { all, call } from "redux-saga/effects";
import { runSaga, Saga } from "redux-saga";
import apiSaga from "./modules/api/saga";
import { Action } from "redux";

const sagas = [
  ...apiSaga,
];

function* root() {
  yield all(sagas.map((saga) => call(saga)));
}

export async function recordSaga(saga: Saga, initialAction: Action) {
  const dispatched: Action[] = [];
  const runner = runSaga(
    {
      dispatch: (action: Action) => dispatched.push(action),
    },
    saga,
    initialAction
    );
    
    // @ts-ignore
  await runner.done;

  return dispatched;
}

export { root };
