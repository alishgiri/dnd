import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppBar from "./components/AppBar";
import SpellsList from "./pages/SpellsList";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppBar />
      <Routes>
        <Route path="/" element={<SpellsList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
