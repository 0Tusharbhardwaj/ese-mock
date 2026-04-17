const Candidate = require("../models/Candidate");

exports.createCandidate = async (req, res) => {
  try {
    const { name, email, skills, experience, bio } = req.body;
    
    let candidate = await Candidate.findOne({ email });
    if (candidate) {
      return res.status(400).json({ msg: "Candidate already exists with this email" });
    }

    // Skills usually come as comma separated or array
    const parsedSkills = Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim());

    candidate = new Candidate({
      name,
      email,
      skills: parsedSkills,
      experience,
      bio,
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ msg: "Candidate not found" });
    res.json(candidate);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Candidate not found" });
    res.status(500).send("Server Error");
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const { name, email, skills, experience, bio } = req.body;

    const candidateFields = {};
    if (name) candidateFields.name = name;
    if (email) candidateFields.email = email;
    if (skills) candidateFields.skills = Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim());
    if (experience) candidateFields.experience = experience;
    if (bio) candidateFields.bio = bio;

    let candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ msg: "Candidate not found" });

    candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { $set: candidateFields },
      { new: true }
    );

    res.json(candidate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ msg: "Candidate not found" });

    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ msg: "Candidate removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Candidate not found" });
    res.status(500).send("Server Error");
  }
};
