const mongoose = require("mongoose");

const ConcertSchema = new mongoose.Schema({
  numarIdentificare: {
    type: Number,
    unique: true,
    required: [true, "Adauga numar de identificare"],
  },
  nume: {
    type: String,
    required: [true, "Introdu numele concertului"],
    maxlength: 50,
  },
  locatie: {
    type: String,
    required: [true, "Te rog alege locatia concertului"],
    maxlength: 50,
  },
  data: {
    type: Date,
    required: [true, "Introdu data concertului"],
  },
  bilete: {
    type: String,
    required: [true, "Introdu numarul de bilete alocate"],
    maxlength: 4,
  },
});

module.exports = mongoose.model("Concert", ConcertSchema);
