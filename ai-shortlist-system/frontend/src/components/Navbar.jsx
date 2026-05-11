import { Search, Bell, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-10 flex items-center justify-between px-8">
      <div className="flex items-center w-96 relative">
        <Search className="w-5 h-5 text-muted absolute left-3" />
        <input
          type="text"
          placeholder="Search candidates, skills..."
          className="w-full bg-surface border border-border rounded-full py-2 pl-10 pr-4 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-surface text-muted hover:text-text transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text">Recruiter Admin</p>
            <p className="text-xs text-muted">admin@stitch.ai</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
