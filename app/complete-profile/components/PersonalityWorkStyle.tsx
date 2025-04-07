import React from "react";

const conflictResolutionStyles = [
  "Direct Confrontation",
  "Mediation",
  "Avoidance",
  "Compromise"
];

const timeManagementStyles = ["Structured", "Flexible"];

interface PersonalityWorkStyleProps {
  formData: {
    personality_scale: number;
    conflict_resolution_style: string;
    time_management_style: string;
    adaptability_rating: number;
  };
  updateFormData: (updates: Partial<PersonalityWorkStyleProps["formData"]>) => void;
}

const PersonalityWorkStyle: React.FC<PersonalityWorkStyleProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: parseInt(value, 10) });
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
            <h3 className="text-sm font-medium text-blue-800">Personality & Work Style</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Share a bit about your work preferences and personal style. This helps us match you with compatible teammates.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="personality_scale" className="block text-sm font-medium text-gray-700 mb-2">
          Personality Scale: Introvert (1) to Extrovert (10)
        </label>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">1</span>
          <input
            type="range"
            id="personality_scale"
            name="personality_scale"
            min="1"
            max="10"
            value={formData.personality_scale}
            onChange={handleSliderChange}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-500">10</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">Introvert</span>
          <span className="text-xs text-gray-500">Extrovert</span>
        </div>
        <div className="text-center mt-1">
          <span className="text-sm font-medium">{formData.personality_scale}</span>
        </div>
      </div>

      <div>
        <label htmlFor="conflict_resolution_style" className="block text-sm font-medium text-gray-700">
          Conflict Resolution Style
        </label>
        <select
          id="conflict_resolution_style"
          name="conflict_resolution_style"
          value={formData.conflict_resolution_style}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select your conflict resolution style</option>
          {conflictResolutionStyles.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">
          How do you typically handle disagreements or conflicts in a team setting?
        </p>
      </div>

      <div>
        <label htmlFor="time_management_style" className="block text-sm font-medium text-gray-700">
          Time Management Style
        </label>
        <select
          id="time_management_style"
          name="time_management_style"
          value={formData.time_management_style}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select your time management style</option>
          {timeManagementStyles.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">
          Do you prefer structured schedules or more flexible approaches to managing your time?
        </p>
      </div>

      <div>
        <label htmlFor="adaptability_rating" className="block text-sm font-medium text-gray-700 mb-2">
          Adaptability Rating: Low (1) to High (5)
        </label>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">1</span>
          <input
            type="range"
            id="adaptability_rating"
            name="adaptability_rating"
            min="1"
            max="5"
            value={formData.adaptability_rating}
            onChange={handleSliderChange}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-500">5</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">Less Adaptable</span>
          <span className="text-xs text-gray-500">Highly Adaptable</span>
        </div>
        <div className="text-center mt-1">
          <span className="text-sm font-medium">{formData.adaptability_rating}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          How well do you adapt to changing circumstances, requirements, or project directions?
        </p>
      </div>

      <div className="border-t border-gray-200 pt-5">
        <div className="text-xs text-gray-500">
          Understanding your work style helps us create balanced teams with complementary traits.
        </div>
      </div>
    </div>
  );
};

export default PersonalityWorkStyle; 