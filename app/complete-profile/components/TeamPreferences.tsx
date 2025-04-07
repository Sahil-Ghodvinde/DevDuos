import React from "react";

const teamRoles = ["Developer", "Designer", "Project Manager", "QA", "Business Analyst"];
const leadershipPreferences = ["Yes", "No", "Depends"];
const collaborationStyles = ["Structured Planning", "Spontaneous", "Balanced"];
const workModePreferences = ["Remote", "In-Person", "Hybrid"];

interface TeamPreferencesProps {
  formData: {
    preferred_role: string;
    leadership_preference: string;
    collaboration_style: string;
    work_mode_preference: string;
  };
  updateFormData: (updates: Partial<TeamPreferencesProps["formData"]>) => void;
}

const TeamPreferences: React.FC<TeamPreferencesProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Team Role Preferences</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Let us know how you prefer to work in a team environment. This helps match you with teammates who have complementary styles.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="preferred_role" className="block text-sm font-medium text-gray-700">
          Preferred Team Role
        </label>
        <select
          id="preferred_role"
          name="preferred_role"
          value={formData.preferred_role}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select your preferred role</option>
          {teamRoles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Leadership Preference (Are you interested in leading a team?)
        </label>
        <div className="flex space-x-4">
          {leadershipPreferences.map((pref) => (
            <div key={pref} className="flex items-center">
              <input
                id={`leadership-${pref}`}
                name="leadership_preference"
                type="radio"
                value={pref}
                checked={formData.leadership_preference === pref}
                onChange={handleRadioChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={`leadership-${pref}`} className="ml-2 block text-sm text-gray-700">
                {pref}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="collaboration_style" className="block text-sm font-medium text-gray-700">
          Collaboration Style
        </label>
        <select
          id="collaboration_style"
          name="collaboration_style"
          value={formData.collaboration_style}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select your collaboration style</option>
          {collaborationStyles.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">
          This describes how you prefer to approach projects and work with others.
        </p>
      </div>

      <div>
        <label htmlFor="work_mode_preference" className="block text-sm font-medium text-gray-700">
          Work Mode Preference
        </label>
        <select
          id="work_mode_preference"
          name="work_mode_preference"
          value={formData.work_mode_preference}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select your preferred work mode</option>
          {workModePreferences.map((mode) => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
      </div>

      <div className="border-t border-gray-200 pt-5">
        <div className="text-xs text-gray-500">
          Understanding your work preferences helps create more effective and harmonious teams.
        </div>
      </div>
    </div>
  );
};

export default TeamPreferences; 