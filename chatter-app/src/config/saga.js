import { all } from "redux-saga/effects";
import mainSaga from '../redux/saga';

export default function* rootSaga() {
  // start the two sagas right away - use a different pattern here depending on
  // how your sagas are structured
  yield all([mainSaga()]);
}
