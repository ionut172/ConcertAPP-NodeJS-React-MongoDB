import React from "react";

function HomeTickets() {
  return (
    <div>
      <nav>
        <img
          className="imagine"
          src="https://upload.wikimedia.org/wikipedia/en/0/06/Untold_logo.png"
          alt="Header Image"
        />
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/">Concerts</a>
          </li>
        </ul>
      </nav>

      <header>
        <img
          src="https://www.thedjrevolution.com/wp-content/uploads/elementor/thumbs/Romanias-UNTOLD-Festival-drops-massive-lineup-for-2021-edition-p99jpvrfd39hqjtx71s9u1qc5txkenlh73uxkh3mn2.jpg"
          alt="Header Image"
        />
      </header>

      <section className="card-container">
        <div className="card">
          <h3>Achizitioneaza bilete acum</h3>
          <p>Ocupa-ti locul cat mai din timp.</p>
        </div>
        <div className="card">
          <h3>
            Reducere <b>-50%</b> la achztia online
          </h3>
          <p>
            Plateste chiar acum biletele tale la festival si beneficiezi de
            reduceri semnificative.
          </p>
        </div>
        <div className="card">
          <h3>Scapa de aglomeratie!</h3>
          <p>
            Punem la dispozitie intrare separata pentru cei ce achizitioneaza
            bilete exclusiv online.
          </p>
        </div>
      </section>
      <div class="middleSection">
        <img
          src="https://www.dancetv.net/assets/www.dancetelevision.net/profiles/mastheads/Untold-Festival.jpg"
          alt="Header Image"
        />
        <button href="/">Concerts</button>
      </div>
    </div>
  );
}

export default HomeTickets;
