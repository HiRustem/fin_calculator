import { BrowserRouter, Route, Routes } from "react-router";
import { CreditCalculator } from "./pages";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/credit_calculator" element={<CreditCalculator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
