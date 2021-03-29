export const setMissions = (missions) => ({
  type: "SET_MISSIONS",
  payload: missions
});

export const setIsLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading
});

export const setIsError = (isError) => ({
  type: "SET_ERROR",
  payload: isError
});

export const updateMission = (updatedMission) => ({
  type: "UPDATE_MISSION",
  payload: updatedMission
});

export const setShowCompletedMissions = (showCompleted) => ({
  type: "SET_SHOW_COMPLETED",
  payload: showCompleted
});

export const setClickedCoordinates = (lat, long) => ({
  type: "SET_CLICKED_COORDS",
  payload: { lat, long }
});

export const addMission = (missionToAdd) => ({
  type: "ADD_MISSION",
  payload: missionToAdd
});

export const deleteMissions = (ids) => ({
  type: "DELETE_MISSIONS",
  payload: ids
});
