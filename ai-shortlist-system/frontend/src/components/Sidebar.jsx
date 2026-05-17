import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, Sparkles, Settings, PieChart } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Candidates", path: "/candidates", icon: Users },
  { name: "Add Candidate", path: "/add-candidate", icon: UserPlus },
  { name: "Shortlisting AI", path: "/match", icon: Sparkles },
  { name: "Analytics", path: "/analytics", icon: PieChart },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-surface border-r border-border h-screen sticky top-0 flex flex-col p-4">
      <div className="flex items-center gap-3 mb-10 px-2 mt-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-muted">
          Stitch.ai
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive && item.path !== "#"
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-text hover:bg-white/5"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive && item.path !== "#" ? "text-primary" : "text-muted"}`} />
                <span className="font-medium">{item.name}</span>
                {isActive && item.path !== "#" && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-background/50 rounded-xl border border-border">
        <p className="text-sm text-muted">Plan</p>
        <p className="font-semibold text-text">Pro Tier</p>
      </div>
    </div>
  );
};

export default Sidebar;
