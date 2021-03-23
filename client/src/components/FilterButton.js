import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { getShowCompletedMissions } from "../redux/selectors";
import { setShowCompletedMissions } from "../redux/actions";

const FilterButton = () => {
  const dispatch = useDispatch();
  const showCompletedMissions = useSelector(getShowCompletedMissions);

  return (
    <Tooltip
      title={`${showCompletedMissions ? "Hide" : "Show"} Completed`}
      arrow
    >
      <IconButton
        color={showCompletedMissions ? "inherit" : "secondary"}
        onClick={() =>
          dispatch(setShowCompletedMissions(!showCompletedMissions))
        }
        aria-label="sort button"
      >
        <FilterList />
      </IconButton>
    </Tooltip>
  );
};

export default FilterButton;
