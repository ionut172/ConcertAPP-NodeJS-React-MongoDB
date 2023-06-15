const Concert = require("../model/concert");

const toateConcertele = async function (req, res) {
  try {
    const concert = await Concert.find({});
    res.status(200).json({ concert });
  } catch (error) {
    console.log(error);
  }
};
const realizeazaConcert = async function (req, res) {
  try {
    const { numarIdentificare, nume, locatie, data, bilete } = req.body;
    const concert = await Concert.create({
      numarIdentificare,
      nume,
      locatie,
      data,
      bilete,
    });
    if (concert) {
      res.status(200).json("Concert adaugat." + concert);
    } else {
      res.status(400).json("Nu s-a adaugat nimic");
    }
  } catch (error) {
    console.log(error);
  }
};
const unConcert = async function (req, res) {
  try {
    const { numarIdentificare } = req.params;

    const singurConcert = await Concert.findOne({
      numarIdentificare: numarIdentificare,
    });
    if (!singurConcert) {
      res.status(401).json("nu sunt date");
      return;
    }
    return res.status(200).json("Concertul gasit este " + singurConcert);
  } catch (error) {
    console.log(error);
  }
};
const updateConcert = async function (req, res) {
  try {
    const { numarIdentificare } = req.params;

    const concert = await Concert.findOneAndUpdate(
      { numarIdentificare: numarIdentificare },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!concert) {
      res.status(401).json("nu sunt date");
      return;
    }
    return res.status(200).json("Concertul s-a updatat si este " + concert);
  } catch (error) {
    console.log(error);
  }
};

const deleteConcert = async function (req, res) {
  const { numarIdentificare: numarIdentificare } = req.params;
  const concert = await Concert.findOneAndDelete({
    numarIdentificare: numarIdentificare,
  });
  if (!concert) {
    return res.status(401).json("nu s-a sters");
  }
  res.status(200).send("sters");
};

const generateReport = async function (req, res) {
  const { startDate, endDate } = req.params;
  console.log(startDate, endDate);
  try {
    const concerts = await Concert.find({
      data: { $gte: startDate, $lte: endDate },
    });
    console.log(concerts);
    res.status(200).json({ concerts });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};

module.exports = {
  toateConcertele,
  realizeazaConcert,
  unConcert,
  updateConcert,
  deleteConcert,
  generateReport,
};
