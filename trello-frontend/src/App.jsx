import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Onboarding from "./pages/Onboarding";
import Organization from "./pages/Organization";
import Board from "./pages/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/board/:boardId" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;