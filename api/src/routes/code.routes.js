const express = require("express");
const router = express.Router();

const Code = require("../models/code.models");

router.post("/new-code", async (req, res) => {
  try {
    const { author, fileName, code, language } = req.body;
    const newCode = await Code.create({
      author: author,
      fileName: fileName,
      code: code,
      language: language,
    });
    res.status(201).json({ message: "code saved", code: newCode });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/save/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;

    const savedCode = await Code.findByIdAndUpdate(
      id,
      { $set: { code: code } },
      { new: true }
    );

    if (!savedCode) {
      return res.status(404).json({ message: "Code not found" });
    }

    res.status(200).json({ message: "Code saved", code: savedCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Code.findByIdAndDelete(id);
    res.status(200).json({ message: "code deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const codes = await Code.find().sort({ createdAt: -1 });
    res.status(200).json({ codes: codes });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const code = await Code.findById(id);
    res.status(200).json({ code: code });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
