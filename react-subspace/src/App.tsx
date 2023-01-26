import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRoute } from "./utils/routes";
import { Home, Layout, Profile, Settings } from "./pages";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.Home} element={<Layout />}>
          <Route index element={<Home />} />

          {/* isAuth route */}
          <Route element={<RequireAuth />}>
            <Route path={AppRoute.Profile} element={<Profile />} />
            <Route path={AppRoute.Settings} element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
