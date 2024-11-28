import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/LandingPage";
import AppPage from "./pages/App";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </Router>
  );
}

export default App;
