import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    "&::-webkit-scrollbar": {
      width: "15px",
    },
    "&::-webkit-scrollbar-track": {
      outline: `1px solid ${theme.palette.divider}`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const FlexOverflowWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} overflow="auto" height="0px" flex="1 1 auto">
      {children}
    </Box>
  );
};

export default FlexOverflowWrapper;
