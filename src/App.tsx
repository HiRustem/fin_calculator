import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { CreditCalculator } from "./pages";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/credit_calculator" element={<CreditCalculator />} />
        <Route path="*" element={<Navigate to="credit_calculator" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
