import { motion } from "framer-motion";
import { Users, CheckCircle, TrendingUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/candidates");
        setStats({ total: res.data.length });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Candidates", value: stats.total, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Shortlisted", value: Math.floor(stats.total * 0.4), icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "AI Matches", value: Math.floor(stats.total * 0.2), icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Placement Rate", value: "85%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-text">Dashboard Overview</h1>
        <p className="text-muted mt-1">Welcome back. Here is what's happening with your candidates today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="card flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-muted">{stat.title}</p>
              <h3 className="text-3xl font-bold text-text mt-2">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-bold text-text mb-4">Recent Candidates</h2>
          <div className="animate-pulse flex space-y-4 flex-col">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-surface border border-border rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-surface rounded w-1/4"></div>
                  <div className="h-3 bg-surface rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold text-text mb-4">AI Insights</h2>
          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
            <Sparkles className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm text-text">Our AI indicates that candidate experience in React and Node.js yields the highest placement success. Consider prioritizing these skills in your next job matching.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
