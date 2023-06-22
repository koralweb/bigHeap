const { Router } = require("express");
const authorizationRequest = require("../controllers/authorizationRequest.js");
const updateTokens = require("../controllers/updateTokens");

const router = Router();

router.post("/authorizationRequest", authorizationRequest);
router.post("/updateTokens", updateTokens);

module.exports = router;
