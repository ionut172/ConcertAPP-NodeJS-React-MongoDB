import axios from "axios";
import React, { useState } from "react";

function StergeConcert() {
  const [numarIdentificare, setNumarIdentificare] = useState("");

  const stergeConcertul = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3999/site/${numarIdentificare}`
      );
      console.log(response.data);
      setNumarIdentificare("");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted!");
    console.log("Numar Identificare", numarIdentificare);

    stergeConcertul();
  };

  return (
    <div>
      <h2>Șterge un concert</h2>
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
        <button type="submit">Șterge</button>
      </form>
    </div>
  );
}

export default StergeConcert;
