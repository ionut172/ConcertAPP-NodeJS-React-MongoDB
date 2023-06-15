import axios from "axios";
import React, { useState } from "react";

function EditeazaConcert({ onClose, modifyClick, numarIdentificare }) {
  const [numarIdentificare1, setNumarIdentificare] =
    useState(numarIdentificare);
  const [nume, setArtist] = useState("");
  const [bilete, setBilete] = useState("");
  const [data, setData] = useState("");
  const [locatie, setLocatie] = useState("");

  const editConcert = async () => {
    try {
      if (!numarIdentificare) {
        console.error("Numar identificare is empty or undefined");
        return;
      }

      const concertUpdate = {
        numarIdentificare: parseInt(numarIdentificare),
        nume,
        bilete,
        data,
        locatie,
      };

      const response = await axios.patch(
        `http://localhost:3999/site/${numarIdentificare}`,
        concertUpdate
      );
      console.log("Concert edited!", response.data);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted!");

    console.log("Artist:", nume);
    console.log("Bilete:", bilete);
    console.log("Data:", data);
    console.log("Locatie:", locatie);

    editConcert();
    onClose();
  };

  return (
    <div>
      <h2>Modifica Concertul</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numarIdentificare">Numar Identificare:</label>
        <input
          type="text"
          id="numarIdentificare"
          value={numarIdentificare}
          readOnly
          placeholder="ID"
          required
        />
        <br />

        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          value={nume}
          onChange={(event) => setArtist(event.target.value)}
          placeholder="Artist"
          required
        />
        <br />

        <label htmlFor="bilete">Bilete:</label>
        <input
          type="number"
          id="bilete"
          value={bilete}
          onChange={(event) => setBilete(event.target.value)}
          placeholder="Bilete"
          required
        />
        <br />

        <label htmlFor="data">Data:</label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(event) => setData(event.target.value)}
          placeholder="Data"
          required
        />
        <br />

        <label htmlFor="locatie">Locatie:</label>
        <input
          type="text"
          id="locatie"
          value={locatie}
          onChange={(event) => setLocatie(event.target.value)}
          placeholder="Locatie"
          required
        />
        <br />

        <button type="submit">Salveaza</button>

        <button type="button" onClick={onClose}>
          Inchide fereastra
        </button>
      </form>
    </div>
  );
}

export default EditeazaConcert;
