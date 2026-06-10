const express = require("express");
const router = express.Router();

const {
  createDocument,
  getMyDocuments,
  updateDocument,
  shareDocument,
  getSharedDocuments,
  getDocumentById,
} = require("../controllers/documentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createDocument);

router.get("/", authMiddleware, getMyDocuments);

router.get("/:id", authMiddleware, getDocumentById);

router.put("/:id", authMiddleware, updateDocument);

router.post("/:id/share", authMiddleware, shareDocument);

router.get("/shared/all", authMiddleware, getSharedDocuments);

module.exports = router;