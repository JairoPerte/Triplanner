import React from "react";
import Calendario from "../components/calendario";
import Proximo from "../components/proximo";

export default function Home() {
  return (
    <div className="d-flex">
      <Calendario />
      <Proximo />
    </div>
  );
}
