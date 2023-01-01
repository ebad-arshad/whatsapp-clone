const INITIAL_STATE = {
  isLoggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGNEDIN':
      return {
        ...state,
        user: JSON.parse(action.userData),
      }
    case 'SIGNEDUP':
      return {
        ...state,
        user: JSON.parse(action.userData),
      }
    case 'HASLOGGEDIN':
      return {
        ...state,
        user: JSON.parse(action.userData),
        isLoggedIn: true,
      }
    default:
      return state;
  }
};
