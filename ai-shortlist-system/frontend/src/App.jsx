import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddCandidate from "./pages/AddCandidate";
import CandidateList from "./pages/CandidateList";
import MatchCandidates from "./pages/MatchCandidates";

import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-candidate" element={<AddCandidate />} />
        <Route path="candidates" element={<CandidateList />} />
        <Route path="match" element={<MatchCandidates />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
