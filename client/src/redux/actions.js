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

export const deleteMissions = (ids) => ({
  type: "DELETE_MISSIONS",
  payload: ids
});
