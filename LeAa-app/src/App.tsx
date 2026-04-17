import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Activities from "@/pages/Activities";
import ActivityDetail from "@/pages/ActivityDetail";
import Result from "@/pages/Result";
import CreateActivity from "@/pages/CreateActivity";
import Settlement from "@/pages/Settlement";
import Rating from "@/pages/Rating";
import Chat from "@/pages/Chat";
import Hubs from "@/pages/Hubs";
import Profile from "@/pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/create-activity" element={<CreateActivity />} />
        <Route path="/settlement/:id" element={<Settlement />} />
        <Route path="/rating/:id" element={<Rating />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/hubs" element={<Hubs />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
