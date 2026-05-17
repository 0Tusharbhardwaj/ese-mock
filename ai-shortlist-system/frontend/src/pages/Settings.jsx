import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Save, Bell, Shield, Palette } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [saveMessage, setSaveMessage] = useState("");

  const handleSave = () => {
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const tabs = [
    { id: "General", icon: SettingsIcon },
    { id: "Notifications", icon: Bell },
    { id: "Security", icon: Shield },
    { id: "Appearance", icon: Palette },
  ];

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
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${
                activeTab === tab.id 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted hover:bg-surface hover:text-text"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.id}
            </button>
          ))}
        </div>

        <div className="col-span-2 space-y-6">
          <div className="card min-h-[400px] flex flex-col">
            <h2 className="text-xl font-bold text-text mb-6 border-b border-border pb-4">{activeTab} Preferences</h2>
            
            <div className="space-y-5 flex-1">
              {activeTab === "General" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text">Company Name</label>
                    <input type="text" className="input-field" defaultValue="Stitch.ai Recruitment" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text">Contact Email</label>
                    <input type="email" className="input-field" defaultValue="admin@stitch.ai" />
                  </div>
                </>
              )}

              {activeTab === "Notifications" && (
                <>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                    <div>
                      <h3 className="font-medium text-text">Email Alerts</h3>
                      <p className="text-sm text-muted">Receive email when AI shortlists a candidate</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                    <div>
                      <h3 className="font-medium text-text">Weekly Digest</h3>
                      <p className="text-sm text-muted">Get a summary of recruitment activities</p>
                    </div>
                    <div className="w-12 h-6 bg-surface rounded-full relative cursor-pointer border border-border">
                      <div className="w-5 h-5 bg-muted rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Security" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text">Change Password</label>
                    <input type="password" className="input-field" placeholder="New Password" />
                    <input type="password" className="input-field mt-2" placeholder="Confirm Password" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border mt-4">
                    <div>
                      <h3 className="font-medium text-text">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted">Require 2FA for all administrative actions</p>
                    </div>
                    <div className="w-12 h-6 bg-surface rounded-full relative cursor-pointer border border-border">
                      <div className="w-5 h-5 bg-muted rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Appearance" && (
                <>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                    <div>
                      <h3 className="font-medium text-text">Dark Mode</h3>
                      <p className="text-sm text-muted">Use dark theme across the dashboard</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                    <div>
                      <h3 className="font-medium text-text">Compact View</h3>
                      <p className="text-sm text-muted">Reduce padding to show more candidates per page</p>
                    </div>
                    <div className="w-12 h-6 bg-surface rounded-full relative cursor-pointer border border-border">
                      <div className="w-5 h-5 bg-muted rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
              <span className="text-green-500 text-sm font-medium">{saveMessage}</span>
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
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
