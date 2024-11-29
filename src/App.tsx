import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import WaitingRoomDisplay from "./components/patient-waiting/WaitingRoomDisplay";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waiting-room" element={<WaitingRoomDisplay />} />
      </Routes>
    </Suspense>
  );
}

export default App;
