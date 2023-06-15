const express = require("express");
const router = express.Router();

const {
  toateConcertele,
  realizeazaConcert,
  unConcert,
  updateConcert,
  deleteConcert,
  generateReport,
} = require("../controller/concert");

router.route("/").get(toateConcertele).post(realizeazaConcert);
router.get("/:numarIdentificare", unConcert);
router.get("/report/:startDate/:endDate", generateReport);
router.patch("/:numarIdentificare", updateConcert);
router.delete("/:numarIdentificare", deleteConcert);

module.exports = router;
