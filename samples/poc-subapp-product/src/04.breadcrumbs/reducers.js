import { combineReducers } from "redux";

const number = (store, action) => {
  if (action.type === "INC_NUMBER") {
    return {
      value: store.value + 1
    };
  } else if (action.type === "DEC_NUMBER") {
    return {
      value: store.value - 1
    };
  }

  return store || { value: 998 };
};

const items = s => {
  return s || { items: [] };
};

export default combineReducers({
  number,
  items
});
