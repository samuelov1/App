const initialState = {
  missions: [],
  showCompletedMissions: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MISSIONS": {
      return { ...state, missions: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
