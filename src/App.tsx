import { Grid } from "@mui/material";
import Routes from "./routes";

import Login from "./screens/Authentication/Login2.tsx";

function App() {
  return (
    <Grid container className = "main-body">
      <Routes/>
      {/* <Login></Login> */}
    </Grid>
  );
}

export default App;
