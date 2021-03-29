import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { getShowCompletedMissions, getAllMissions } from "../redux/selectors";
import { setShowCompletedMissions } from "../redux/actions";

const FilterButton = () => {
  const dispatch = useDispatch();
  const showCompletedMissions = useSelector(getShowCompletedMissions);
  const missions = useSelector(getAllMissions);

  const selectedMissions = useMemo(() => {
    return missions.filter((mission) => mission.isCompleted);
  }, [missions]);

  return (
    <Tooltip
      title={`${showCompletedMissions ? "Hide" : "Show"} Completed`}
      arrow
    >
      <span>
        <IconButton
          color={showCompletedMissions ? "inherit" : "secondary"}
          onClick={() =>
            dispatch(setShowCompletedMissions(!showCompletedMissions))
          }
          aria-label="sort button"
          disabled={!selectedMissions.length}
        >
          <FilterList />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default FilterButton;
