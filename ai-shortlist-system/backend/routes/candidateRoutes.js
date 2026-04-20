const express = require("express");
const router = express.Router();
const {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidateController");

router.route("/").post(createCandidate).get(getCandidates);
router.route("/:id").get(getCandidateById).put(updateCandidate).delete(deleteCandidate);

module.exports = router;
