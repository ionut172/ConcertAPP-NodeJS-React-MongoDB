import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import EditeazaConcert from "./EditeazaConcert";

function ConcertTickets() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [concertData, setConcertData] = useState(null);
  const [report, setReport] = useState(null);
  const [isReportVisible, setIsReportVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchConcertData();
  }, []);

  const handleEditClick = () => {
    setIsEditModalOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "edit-modal") {
      setIsEditModalOpen(false);
    }
  };

  const fetchConcertData = async () => {
    try {
      const response = await axios.get("http://localhost:3999/site/");
      setConcertData(response.data.concert);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBileteClick = (concert) => {
    decrementTickets(concert);
  };

  const modifyClick = (param) => {
    console.log(param);
  };

  const decrementTickets = async (concert) => {
    try {
      const updatedBilete = concert.bilete - 1;

      const response = await axios.patch(
        `http://localhost:3999/site/${concert.numarIdentificare}`,
        { bilete: updatedBilete }
      );

      console.log("Ticket decremented and updated in the database!");
      console.log("Updated concert:", response.data);

      const updatedConcertData = concertData.map((c) =>
        c.numarIdentificare === concert.numarIdentificare
          ? { ...c, bilete: updatedBilete }
          : c
      );

      setConcertData(updatedConcertData);
    } catch (error) {
      console.error("Error decrementing tickets:", error);
    }
  };

  const deleteClick = async (numarIdentificare) => {
    try {
      await axios.delete(`http://localhost:3999/site/${numarIdentificare}`);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const realizeazaClick = () => {
    navigate("/adauga-concert");
  };

  const generateReport = async (timePeriod) => {
    try {
      let startDate, endDate;

      // Calculate start and end dates based on time period
      if (timePeriod === "day") {
        startDate = new Date();
        endDate = new Date();
      } else if (timePeriod === "week") {
        const today = new Date();
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
        endDate = new Date();
      } else if (timePeriod === "month") {
        const today = new Date();
        startDate = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate() + 1
        );
        endDate = new Date();
      } else {
        console.error("Invalid time period");
        return;
      }

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      const response = await axios.get(
        `http://localhost:3999/site/report/${formattedStartDate}/${formattedEndDate}`
      );

      setReport(response.data);
      setIsReportVisible(true);

      console.log(
        `Report from ${formattedStartDate} to ${formattedEndDate}:`,
        response.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section id="concertSection">
        <div className="container">
          <h2>Concerte disponibile</h2>

          {concertData ? (
            concertData.map((concert) => (
              <div key={concert._id}>
                <button onClick={realizeazaClick}>Adauga un concert</button>
                <p>
                  <i>ID: {concert.numarIdentificare}</i>
                </p>
                <b>
                  <p>Artist: {concert.nume}</p>
                  <p>Bilete disponibile: {concert.bilete}</p>

                  <p>Data: {concert.data.slice(0, 10)}</p>
                  <p>Locatie: {concert.locatie}</p>
                  <p>Numar identificare: {concert.numarIdentificare}</p>
                </b>
                <button onClick={() => handleBileteClick(concert)}>
                  Bilete
                </button>
                <button onClick={() => deleteClick(concert.numarIdentificare)}>
                  Sterg concertul
                </button>
                <button onClick={handleEditClick}>
                  {isEditModalOpen ? "Inchide" : "Modifica concertul"}
                </button>
                {isEditModalOpen && (
                  <EditeazaConcert
                    onClose={() => {
                      setIsEditModalOpen(false);
                      modifyClick(concert.numarIdentificare);
                    }}
                    modifyClick={modifyClick}
                    numarIdentificare={concert.numarIdentificare}
                  />
                )}

                <hr />
              </div>
            ))
          ) : (
            <p>Loading concert data...</p>
          )}
        </div>
        <div class="report">
          <button onClick={() => generateReport("day")}>
            Generate Report (Last Day)
          </button>
          <button onClick={() => generateReport("week")}>
            Generate Report (Last Week)
          </button>
          <button onClick={() => generateReport("month")}>
            Generate Report (Last Month)
          </button>
          {isEditModalOpen && (
            <button onClick={() => setIsEditModalOpen(false)}>Inchide</button>
          )}
        </div>
      </section>
      {isReportVisible && (
        <section>
          <h2>Report</h2>
          <ul>
            {report.concerts.map((concert) => (
              <li key={concert._id}>
                <p>Nume: {concert.nume}</p>
                <p>Locatie: {concert.locatie}</p>
                <p>Data: {concert.data}</p>
                <p>Tichete: {concert.bilete}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsReportVisible(false)}>Close</button>
        </section>
      )}

      {isEditModalOpen &&
        createPortal(
          <div
            id="edit-modal"
            className="edit-modal"
            onClick={handleOutsideClick}
          ></div>,
          document.body
        )}
    </div>
  );
}

export default ConcertTickets;
