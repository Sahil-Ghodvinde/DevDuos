import React from "react";

const previousHackathons = ["Hackathon A", "Hackathon B", "Hackathon C", "Other"];
const hackathonGoals = ["Networking", "Skill Development", "Winning Prizes", "Learning", "Exploring Ideas"];
const teamSizes = ["Solo", "2-3", "4-5", "6+"];

interface HackathonExperienceProps {
  formData: {
    hackathon_experience: boolean;
    previous_hackathons: string[];
    hackathon_goals: string[];
    preferred_team_size: string;
  };
  updateFormData: (updates: Partial<HackathonExperienceProps["formData"]>) => void;
}

const HackathonExperience: React.FC<HackathonExperienceProps> = ({ formData, updateFormData }) => {
  const handleExperienceChange = (value: boolean) => {
    updateFormData({ hackathon_experience: value });
    
    // If changing to "No", clear the previous hackathons
    if (!value) {
      updateFormData({ previous_hackathons: [] });
    }
  };

  const handlePreviousHackathonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedHackathons = checked
      ? [...formData.previous_hackathons, value]
      : formData.previous_hackathons.filter(h => h !== value);
    
    updateFormData({ previous_hackathons: updatedHackathons });
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedGoals = checked
      ? [...formData.hackathon_goals, value]
      : formData.hackathon_goals.filter(g => g !== value);
    
    updateFormData({ hackathon_goals: updatedGoals });
  };

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ preferred_team_size: e.target.value });
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
            <h3 className="text-sm font-medium text-blue-800">Hackathon Experience & Goals</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Tell us about your hackathon experience and what you&apos;re looking to achieve.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Have you participated in hackathons before?
        </label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              id="hackathon-yes"
              name="hackathon_experience"
              type="radio"
              checked={formData.hackathon_experience === true}
              onChange={() => handleExperienceChange(true)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="hackathon-yes" className="ml-2 block text-sm text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="hackathon-no"
              name="hackathon_experience"
              type="radio"
              checked={formData.hackathon_experience === false}
              onChange={() => handleExperienceChange(false)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="hackathon-no" className="ml-2 block text-sm text-gray-700">
              No
            </label>
          </div>
        </div>
      </div>

      {formData.hackathon_experience && (
        <div className="pl-4 border-l-2 border-blue-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Which hackathons have you participated in?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {previousHackathons.map((hackathon) => (
              <div key={hackathon} className="flex items-center">
                <input
                  id={`hackathon-${hackathon}`}
                  name="previous_hackathons"
                  type="checkbox"
                  value={hackathon}
                  checked={formData.previous_hackathons.includes(hackathon)}
                  onChange={handlePreviousHackathonChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`hackathon-${hackathon}`} className="ml-2 block text-sm text-gray-700">
                  {hackathon}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are your goals for participating in hackathons?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {hackathonGoals.map((goal) => (
            <div key={goal} className="flex items-center">
              <input
                id={`goal-${goal}`}
                name="hackathon_goals"
                type="checkbox"
                value={goal}
                checked={formData.hackathon_goals.includes(goal)}
                onChange={handleGoalChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`goal-${goal}`} className="ml-2 block text-sm text-gray-700">
                {goal}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="preferred_team_size" className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Team Size
        </label>
        <select
          id="preferred_team_size"
          name="preferred_team_size"
          value={formData.preferred_team_size}
          onChange={handleTeamSizeChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select preferred team size</option>
          {teamSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="border-t border-gray-200 pt-5">
        <div className="text-xs text-gray-500">
          This information helps us understand your hackathon goals and experience level.
        </div>
      </div>
    </div>
  );
};

export default HackathonExperience; 