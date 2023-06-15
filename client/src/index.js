import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConcertTickets from "./ConcertTickets";
import AdaugaConcert from "./AdaugaConcert";
import EditeazaConcert from "./EditeazaConcert";
import HomeTickets from "./HomeTickets";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<ConcertTickets />} />
      <Route path="/adauga-concert" element={<AdaugaConcert />} />
      <Route path="/editeaza-concert" element={<EditeazaConcert />} />
      <Route path="/home" element={<HomeTickets />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
