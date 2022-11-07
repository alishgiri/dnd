import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import AppBar from "./components/AppBar";
import SpellsList from "./pages/SpellsList";
import FavouriteList from "./pages/Favourites";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spells" element={<SpellsList />} />
        <Route path="/favourites" element={<FavouriteList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
