import ErrorSnackbar from "./components/ErrorSnackbar";
import Navbar from "./components/Navbar";
import ErrorProvider from "./components/providers/ErrorProvider";

function App() {
  return (
    <ErrorProvider>
      <Navbar />
      <ErrorSnackbar />
    </ErrorProvider>
  );
}

export default App;
