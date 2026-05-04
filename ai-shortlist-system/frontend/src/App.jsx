import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddCandidate from "./pages/AddCandidate";
import CandidateList from "./pages/CandidateList";
import MatchCandidates from "./pages/MatchCandidates";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-candidate" element={<AddCandidate />} />
        <Route path="candidates" element={<CandidateList />} />
        <Route path="match" element={<MatchCandidates />} />
      </Route>
    </Routes>
  );
}

export default App;
