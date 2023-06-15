import axios from "axios";
import React, { useState } from "react";
import "./AdaugaConcert.css";
function AdaugaConcert() {
  const [numarIdentificare, setNumarIdentificare] = useState("");
  const [artist, setArtist] = useState("");
  const [bilete, setBilete] = useState("");
  const [data, setData] = useState("");
  const [locatie, setLocatie] = useState("");

  const addConcert = async () => {
    try {
      const response = await axios.post("http://localhost:3999/site/", {
        numarIdentificare: numarIdentificare,
        nume: artist,
        bilete: bilete,
        data: data,
        locatie: locatie,
      });
      console.log(response.data);

      // Redirect to a new path after successful form submission
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted!");
    console.log("Numar Identificare", numarIdentificare);
    console.log("Artist:", artist);
    console.log("Bilete:", bilete);
    console.log("Data:", data);
    console.log("Locatie:", locatie);

    addConcert();
    setNumarIdentificare("");
    setArtist("");
    setBilete("");
    setData("");
    setLocatie("");
  };

  return (
    <div>
      <h2>Adaugă un concert</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numarIdentificare">Numar identificare:</label>
        <input
          type="text"
          id="numarIdentificare"
          value={numarIdentificare}
          onChange={(event) => setNumarIdentificare(event.target.value)}
          required
        />
        <br />
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
          required
        />
        <br />

        <label htmlFor="bilete">Bilete:</label>
        <input
          type="number"
          id="bilete"
          value={bilete}
          onChange={(event) => setBilete(event.target.value)}
          required
        />
        <br />

        <label htmlFor="data">Data:</label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(event) => setData(event.target.value)}
          required
        />
        <br />

        <label htmlFor="locatie">Locatie:</label>
        <input
          type="text"
          id="locatie"
          value={locatie}
          onChange={(event) => setLocatie(event.target.value)}
          required
        />
        <br />

        <button type="submit">Adaugă</button>
      </form>
    </div>
  );
}

export default AdaugaConcert;
