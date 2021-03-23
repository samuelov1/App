import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMissions, setIsLoading, setIsError } from "./redux/actions";

import { Box } from "@material-ui/core";
import MainView from "./components/MainView";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let canceled = false;
    const requestSource = axios.CancelToken.source();

    const fetch = async () => {
      try {
        dispatch(setIsLoading(true));
        dispatch(setIsError(false));

        const { data } = await axios.get("/missions", {
          cancelToken: requestSource.token
        });

        if (!canceled) {
          dispatch(setMissions(data));
        }
      } catch (error) {
        console.error(error);
        dispatch(setIsError(true));
      }
      dispatch(setIsLoading(false));
    };

    fetch();

    return () => {
      canceled = true;
      requestSource.cancel();
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Navbar />
      <MainView />
    </Box>
  );
}

export default App;
