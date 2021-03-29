import { Tooltip as muiTooltip, withStyles } from "@material-ui/core";

const Tooltip = withStyles((theme) => ({
  tooltip: theme.typography.body2
}))(muiTooltip);

export default Tooltip;
