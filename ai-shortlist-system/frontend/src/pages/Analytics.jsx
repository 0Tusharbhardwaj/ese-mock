import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart as PieChartIcon, TrendingUp, Users } from "lucide-react";

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"];

const Analytics = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("https://ese-mock.onrender.com/api/candidates");
        setCandidates(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  if (loading) {
    return <div className="text-muted flex justify-center mt-20">Loading analytics data...</div>;
  }

  // Calculate Experience Distribution
  const expDistribution = {
    "0-2 Years": 0,
    "3-5 Years": 0,
    "6-8 Years": 0,
    "9+ Years": 0,
  };

  // Calculate Skills Frequency
  const skillsCount = {};

  candidates.forEach(c => {
    // Experience grouping
    const exp = c.experience;
    if (exp <= 2) expDistribution["0-2 Years"]++;
    else if (exp <= 5) expDistribution["3-5 Years"]++;
    else if (exp <= 8) expDistribution["6-8 Years"]++;
    else expDistribution["9+ Years"]++;

    // Skills grouping
    c.skills.forEach(skill => {
      const s = skill.trim().toLowerCase();
      skillsCount[s] = (skillsCount[s] || 0) + 1;
    });
  });

  const expData = Object.keys(expDistribution).map(key => ({
    name: key,
    value: expDistribution[key]
  })).filter(item => item.value > 0);

  const skillsData = Object.keys(skillsCount)
    .map(key => ({ name: key, count: skillsCount[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Top 6 skills

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text flex items-center gap-3">
          <PieChartIcon className="w-8 h-8 text-primary" />
          Analytics Dashboard
        </h1>
        <p className="text-muted mt-2">Insights and metrics from your talent pool.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card h-96 flex flex-col">
          <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Experience Distribution
          </h2>
          <div className="flex-1 min-h-0">
            {expData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted">No data available</div>
            )}
          </div>
        </div>

        <div className="card h-96 flex flex-col">
          <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Top Skills in Demand
          </h2>
          <div className="flex-1 min-h-0">
            {skillsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="name" type="category" width={80} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
                  <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]}>
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted">No data available</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
