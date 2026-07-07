import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup"
import Signin from "./pages/Signin";
import Onboarding from "./pages/Onboarding";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="signup"
          element={<Signup />}
        />

        <Route
          path="/signin"
          element={<Signin />}
        />
        <Route
    path="/onboarding"
    element={<Onboarding />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;