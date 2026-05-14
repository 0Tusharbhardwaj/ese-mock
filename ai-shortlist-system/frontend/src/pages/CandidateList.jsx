import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Search, Filter, Mail, Briefcase, Calendar } from "lucide-react";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/candidates");
        setCandidates(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Candidate Directory</h1>
          <p className="text-muted mt-1">Manage and view all candidates in your system.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>
          <button className="p-2 border border-border rounded-lg text-text hover:bg-surface transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5" /> Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="card animate-pulse h-48"></div>
          ))}
        </div>
      ) : filteredCandidates.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-xl border border-border">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted" />
          </div>
          <h3 className="text-xl font-medium text-text">No candidates found</h3>
          <p className="text-muted mt-2">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={candidate._id}
              className="card group hover:border-primary/50 transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-text truncate">{candidate.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted mt-1">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                  {candidate.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-background border border-border rounded-md text-text">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-background border border-border rounded-md text-muted">
                      +{candidate.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>{candidate.experience} yrs exp</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span>{new Date(candidate.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CandidateList;
