const express = require("express");
const router = express.Router();
const { basicMatch, aiShortlist } = require("../controllers/matchController");

router.post("/", basicMatch);
router.post("/ai/shortlist", aiShortlist);

module.exports = router;
