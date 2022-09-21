/////////////////////////////////////////
// Selectors that look into the redux store state and derive information from that state.
/////////////////////////////////////////
import { createSelector } from "reselect";

// Gets the categories portion of the redux store state
const selectCategoriesReducer = state => state.categories;

// Selector that looks at the categories state and gets the categories from that state
export const selectCategories = createSelector(
  [selectCategoriesReducer],
  categories => categories.categories
);

// Selector that looks at the categories selector and creates an array of the categories
export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
