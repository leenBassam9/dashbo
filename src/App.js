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
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isAuthenticated = localStorage.getItem("jwtToken") !== null;

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
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/admins" element={<Admins />} />

                  <Route path="/posts" element={<Posts />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/geography" element={<Geography />} />
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
