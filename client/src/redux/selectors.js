export const getAllMissions = (store) => store.missions;

export const getShowCompletedMissions = (store) => store.showCompletedMissions;

export const getFilteredMissions = (store) => {
  const showCompletedMissions = getShowCompletedMissions(store);
  const missions = getAllMissions(store);

  return showCompletedMissions
    ? missions
    : missions.filter((mission) => !mission.isCompleted);
};
