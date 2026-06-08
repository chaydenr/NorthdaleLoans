import { Routes, Route } from "react-router-dom";
import { Home } from "Pageviews/Home";
import { Inputs } from "Pageviews/Inputs";
import { Snowball } from "Pageviews/Snowball";
import { Avalanche } from "Pageviews/Avalanche";

export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/NorthdaleLoans/" element={<Home />} />
        <Route path="/NorthdaleLoans/Inputs" element={<Inputs />} />
        <Route path="/NorthdaleLoans/Snowball" element={<Snowball />} />
        <Route path="/NorthdaleLoans/Avalanche" element={<Avalanche />} />
      </Routes>
    </div>
  );
};
