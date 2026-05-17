const Candidate = require("../models/Candidate");
const axios = require("axios");

exports.basicMatch = async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    if (!requiredSkills || requiredSkills.length === 0) {
      return res.status(400).json({ msg: "Required skills are mandatory" });
    }

    const parsedSkills = Array.isArray(requiredSkills) ? requiredSkills : requiredSkills.split(",").map(s => s.trim().toLowerCase());

    const candidates = await Candidate.find();

    const matchedCandidates = candidates.map((candidate) => {
      const candidateSkills = candidate.skills.map(s => s.toLowerCase());
      const matched = candidateSkills.filter(skill => parsedSkills.includes(skill));
      
      const matchPercentage = Math.round((matched.length / parsedSkills.length) * 100);
      
      let rank = "Low Match";
      if (matchPercentage >= 80 && candidate.experience >= (minExperience || 0)) {
        rank = "High Match";
      } else if (matchPercentage >= 50) {
        rank = "Medium Match";
      }

      return {
        candidate,
        matchPercentage,
        matchedSkills: matched,
        rank
      };
    });

    // Sort by match percentage descending
    matchedCandidates.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json(matchedCandidates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.aiShortlist = async (req, res) => {
  try {
    const { requiredSkills, preferredSkills, minExperience } = req.body;
    
    // Get top candidates to send to AI (sending all might exceed token limits)
    const candidates = await Candidate.find();
    
    if(candidates.length === 0) {
        return res.status(400).json({msg: "No candidates found to analyze."});
    }

    const candidateData = candidates.map(c => ({
      id: c._id,
      name: c.name,
      skills: c.skills.join(", "),
      experience: c.experience + " years",
      bio: c.bio
    }));

    const prompt = `
Job Requirements:
- Required Skills: ${Array.isArray(requiredSkills) ? requiredSkills.join(', ') : requiredSkills}
- Preferred Skills: ${Array.isArray(preferredSkills) ? preferredSkills.join(', ') : preferredSkills}
- Minimum Experience: ${minExperience} years

Candidates:
${JSON.stringify(candidateData, null, 2)}

Analyze the above candidates based on the job requirements. Rank them from best to worst.
For each candidate, provide:
1. Rank position
2. Name
3. A brief professional explanation (2-3 sentences) of why they are suitable or not.
4. A score out of 100.

Return the response in a clean, professional recruiter-style analysis. Make it clear who the top recommendation is.
Return the result strictly as a JSON array of objects with keys: id, name, rank, score, explanation.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.3-70b-instruct:free", // Use a free model by default
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiContent = response.data.choices[0].message.content;
    let aiResults = [];
    try {
        // try parsing JSON from AI if it wrapped in markdown
        const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
        if(jsonMatch) {
            aiResults = JSON.parse(jsonMatch[0]);
        } else {
            aiResults = JSON.parse(aiContent);
        }
    } catch(e) {
        // fallback if AI didn't return proper JSON
        console.error("AI did not return valid JSON.", e);
        return res.status(200).json({ rawText: aiContent, parsed: false });
    }

    res.json({ parsed: true, results: aiResults });
  } catch (err) {
    console.error(err.message);
    if(err.response) {
      console.error(err.response.data);
    }
    res.status(500).send("Server Error in AI Shortlist");
  }
};
