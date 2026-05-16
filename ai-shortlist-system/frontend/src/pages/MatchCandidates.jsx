import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Sparkles, BrainCircuit, Target, Award, CheckCircle2, XCircle } from "lucide-react";

const MatchCandidates = () => {
  const [formData, setFormData] = useState({
    requiredSkills: "",
    preferredSkills: "",
    minExperience: "",
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [basicResults, setBasicResults] = useState(null);
  const [aiResults, setAiResults] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBasicMatch = async () => {
    setLoading(true);
    setError("");
    setAiResults(null);
    try {
      const res = await axios.post("http://localhost:5000/api/match", {
        requiredSkills: formData.requiredSkills.split(",").map((s) => s.trim()),
        minExperience: Number(formData.minExperience),
      });
      setBasicResults(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to perform basic match.");
    } finally {
      setLoading(false);
    }
  };

  const handleAIMatch = async () => {
    setAiLoading(true);
    setError("");
    setBasicResults(null);
    try {
      const res = await axios.post("http://localhost:5000/api/match/ai/shortlist", {
        requiredSkills: formData.requiredSkills.split(",").map((s) => s.trim()),
        preferredSkills: formData.preferredSkills.split(",").map((s) => s.trim()),
        minExperience: Number(formData.minExperience),
      });
      setAiResults(res.data);
    } catch (err) {
      setError("AI Analysis failed. Check API key and configuration.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-text flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          AI Shortlisting Engine
        </h1>
        <p className="text-muted mt-2">Find the perfect candidate using rule-based or AI-powered matching.</p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-text mb-6">Job Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Required Skills *</label>
            <input
              type="text"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              className="input-field"
              placeholder="React, Node.js"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Preferred Skills</label>
            <input
              type="text"
              name="preferredSkills"
              value={formData.preferredSkills}
              onChange={handleChange}
              className="input-field"
              placeholder="TypeScript, AWS"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Min Experience (yrs)</label>
            <input
              type="number"
              name="minExperience"
              value={formData.minExperience}
              onChange={handleChange}
              className="input-field"
              placeholder="2"
            />
          </div>
        </div>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleBasicMatch}
            disabled={loading || aiLoading || !formData.requiredSkills}
            className="flex-1 py-3 px-4 bg-surface border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Matching..." : <><Target className="w-5 h-5" /> Basic Match</>}
          </button>
          <button
            onClick={handleAIMatch}
            disabled={loading || aiLoading || !formData.requiredSkills}
            className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {aiLoading ? "AI is Analyzing..." : <><BrainCircuit className="w-5 h-5" /> Run AI Match</>}
          </button>
        </div>
      </div>

      {basicResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <h2 className="text-2xl font-bold text-text">Basic Match Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {basicResults.map((result, i) => (
              <div key={i} className="card relative overflow-hidden">
                <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold rounded-bl-lg ${
                  result.rank === 'High Match' ? 'bg-green-500/20 text-green-500' : 
                  result.rank === 'Medium Match' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {result.rank}
                </div>
                <h3 className="text-lg font-bold text-text mb-2">{result.candidate.name}</h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted">Match Score</span>
                    <span className="text-sm font-bold text-primary">{result.matchPercentage}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${result.matchPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Matched Skills: {result.matchedSkills.join(", ") || "None"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {aiResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> AI Analysis Results
          </h2>
          
          {aiResults.parsed && Array.isArray(aiResults.results) ? (
            <div className="space-y-6">
              {aiResults.results.map((result, i) => (
                <div key={i} className={`card ${i === 0 ? 'border-primary shadow-primary/20' : ''}`}>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-full bg-surface border-4 border-background shadow-inner">
                      <span className="text-sm text-muted">Rank</span>
                      <span className="text-2xl font-black text-primary">#{result.rank}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-text flex items-center gap-2">
                          {result.name}
                          {i === 0 && <Award className="w-5 h-5 text-yellow-500" />}
                        </h3>
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                          Score: {result.score}/100
                        </div>
                      </div>
                      <div className="mt-4 p-4 rounded-lg bg-background/50 border border-border">
                        <p className="text-text italic leading-relaxed">"{result.explanation}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="card">
               <h3 className="text-lg font-bold text-text mb-2">Raw AI Output</h3>
               <pre className="text-sm text-muted whitespace-pre-wrap bg-background p-4 rounded-lg border border-border">
                 {aiResults.rawText}
               </pre>
             </div>
          )}
        </motion.div>
      )}

    </motion.div>
  );
};

export default MatchCandidates;
