const express = require("express");
const router = express.Router();

const Code = require("../models/code.models");

router.post("/new-code", async (req, res) => {
  try {
    const { author, fileName, code } = req.body;
    const newCode = await Code.create({
      author,
      fileName,
      code,
    });
    res.status(201).json({ message: "code saved", code: newCode });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.put("/save/:id", async () => {});
router.delete("/delete/:id", async () => {});
router.get("/", async (req, res) => {
  try {
    const codes = await Code.find();
    res.status(200).json({ codes: codes });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.get("/:id", async () => {});

module.exports = router;
