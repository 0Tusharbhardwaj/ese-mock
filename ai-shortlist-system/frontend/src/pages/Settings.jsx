import { motion } from "framer-motion";
import { Settings as SettingsIcon, Save, Bell, Shield, Palette } from "lucide-react";

const Settings = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-text flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted mt-2">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium transition-colors text-left">
            <SettingsIcon className="w-5 h-5" />
            General
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-muted hover:bg-surface hover:text-text rounded-xl font-medium transition-colors text-left">
            <Bell className="w-5 h-5" />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-muted hover:bg-surface hover:text-text rounded-xl font-medium transition-colors text-left">
            <Shield className="w-5 h-5" />
            Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-muted hover:bg-surface hover:text-text rounded-xl font-medium transition-colors text-left">
            <Palette className="w-5 h-5" />
            Appearance
          </button>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-text mb-6 border-b border-border pb-4">General Preferences</h2>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Company Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  defaultValue="Stitch.ai Recruitment" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Contact Email</label>
                <input 
                  type="email" 
                  className="input-field" 
                  defaultValue="admin@stitch.ai" 
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <div>
                  <h3 className="font-medium text-text">Auto-Shortlist Mode</h3>
                  <p className="text-sm text-muted">Automatically score candidates on creation</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <div>
                  <h3 className="font-medium text-text">Dark Mode</h3>
                  <p className="text-sm text-muted">Use dark theme across the dashboard</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex justify-end">
              <button className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
