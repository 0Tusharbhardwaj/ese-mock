import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { UserPlus, Mail, Briefcase, FileText, Code } from "lucide-react";

const AddCandidate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await axios.post("https://ese-mock.onrender.com/api/candidates", formData);
      setMessage({ type: "success", text: "Candidate added successfully!" });
      setFormData({ name: "", email: "", skills: "", experience: "", bio: "" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.msg || "Failed to add candidate.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Add New Candidate</h1>
        <p className="text-muted mt-2">Enter the candidate's details below to add them to your talent pool.</p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {message.text && (
          <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-primary" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" /> Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              step="0.5"
              className="input-field"
              placeholder="3"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> Bio / Projects
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            rows="4"
            className="input-field resize-none"
            placeholder="Brief bio or links to relevant projects..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2 mt-4"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Add Candidate
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddCandidate;
