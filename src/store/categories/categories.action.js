// ACTION functions related to categories
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// Function to set the categories. Uses the createAction helper function, and returns an object with a type and categories as the payload
export const setCategories = categories => {
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
};
