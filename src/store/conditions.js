const INITIAL_STATE = {
  isAddFriendTab: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADDFRIENDTOGGLE':
      return {
        ...state,
        isAddFriendTab: action.bool,
      }
    default:
      return state;
  }
};
