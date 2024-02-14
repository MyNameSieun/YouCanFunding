const SET_CATEGORY = 'register/SET_CATEGORY';

export const selectCategory = (payload) => {
  return {
    type: SET_CATEGORY,
    payload
  };
};

const initialState = '';

const categoryList = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default categoryList;
