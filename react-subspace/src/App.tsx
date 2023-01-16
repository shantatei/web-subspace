import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRoute } from "./utils/routes";
import { Home, Layout } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.Home} element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
