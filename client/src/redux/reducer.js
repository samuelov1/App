const initialState = {
  missions: [],
  showCompletedMissions: true,
  isLoading: false,
  isError: false,
  clickedCoordinates: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MISSIONS": {
      return { ...state, missions: action.payload };
    }
    case "SET_LOADING": {
      return { ...state, isLoading: action.payload };
    }
    case "SET_ERROR": {
      return { ...state, isError: action.payload };
    }
    case "UPDATE_MISSION": {
      const missionToUpdate = action.payload;

      const updatedMissions = state.missions.map((mission) => {
        return mission._id === missionToUpdate._id ? missionToUpdate : mission;
      });

      return { ...state, missions: updatedMissions };
    }
    case "SET_SHOW_COMPLETED": {
      return { ...state, showCompletedMissions: action.payload };
    }
    case "SET_CLICKED_COORDS": {
      return { ...state, clickedCoordinates: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
