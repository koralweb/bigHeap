import {Router} from "express";
import authorizationRequest from "../controllers/authorizationRequest.js";
import contentStartRequest from "../controllers/contentStartRequest.js";
import startRequest from "../controllers/startRequest.js";
import updateTokensRequest from "../controllers/updateTokensRequest.js";
import isIPClearMiddleware from "../middlewares/isIPClearMiddleware.js";

const router = Router();

router.get("/api/startRequest",isIPClearMiddleware, startRequest);
router.post("/api/authorizationRequest", authorizationRequest);
router.get("/api/contentStartRequest", contentStartRequest);
router.get("/api/updateTokensRequest", updateTokensRequest);

export default router;
