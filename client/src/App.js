import { Box } from "@material-ui/core";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Navbar />
      <HomePage />
    </Box>
  );
}

export default App;
