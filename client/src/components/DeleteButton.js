import axios from "axios";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import Tooltip from "./Tooltip";
import { getAllMissions } from "../redux/selectors";
import { deleteMissions } from "../redux/actions";

const DeleteButton = () => {
  const dispatch = useDispatch();
  const missions = useSelector(getAllMissions);
  const completedMissions = useMemo(
    () => missions.filter((mission) => mission.isCompleted),
    [missions]
  );

  const deleteCompletedMissions = async () => {
    if (!completedMissions.length) return;

    try {
      const ids = completedMissions.map((mission) => mission._id);
      await axios.delete("/missions", { data: { ids } });

      dispatch(deleteMissions(ids));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Tooltip title="Delete Completed" arrow>
      <span>
        <IconButton
          aria-label="delete button"
          onClick={deleteCompletedMissions}
          disabled={!completedMissions.length}
        >
          <Delete />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default DeleteButton;
