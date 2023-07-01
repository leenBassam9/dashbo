import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Posts from "./scenes/posts/index";
import Users from "./scenes/users";
import Form from "./scenes/form";
import Profile from "./scenes/profile";
import Login from "./scenes/login/login";
import Admins from "./scenes/Admins";
// CHARTS
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isAuthenticated = localStorage.getItem("jwtToken") !== null;
  const user = { id: "someUserId" }; // Define the user object or fetch user data

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {isAuthenticated ? (
            <>
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/profile"
                    element={<Profile userId={user.id} />}
                  />
                  <Route path="/users" element={<Users />} />
                  <Route path="/admins" element={<Admins />} />

                  <Route path="/posts" element={<Posts />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/barchart" element={<BarChart />} />
                  <Route path="/piechart" element={<PieChart />} />
                  <Route path="/linechart" element={<LineChart />} />
                  <Route path="*" element={<h1>Page Not Found</h1>} />
                </Routes>
              </main>
            </>
          ) : (
            <Login />
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
