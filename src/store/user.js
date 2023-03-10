const INITIAL_STATE = {
  user: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGNEDIN':
      return {
        ...state,
        user: JSON.parse(action.userData),
      }
    default:
      return state;
  }
};
