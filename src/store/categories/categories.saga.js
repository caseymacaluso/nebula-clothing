import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// Function to get the categories array, will be called further below
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// Generator function that listens for latest call of FETCH_CATEGORIES_START and executes the fetchCategoriesAsync function
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// Generator function that will call all saga functions provided, and will not complete until all are executed
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
