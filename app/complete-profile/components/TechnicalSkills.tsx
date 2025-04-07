import React from "react";

const technicalSkills = ["JavaScript", "Python", "Java", "C++", "Ruby", "Go"];
const proficiencyLevels = ["Beginner", "Intermediate", "Advanced"];
const areasOfInterest = ["Web Development", "Mobile Apps", "Data Science", "AI/ML", "Game Development"];
const toolsFrameworks = ["React", "Angular", "Vue", "Django", "Flask", "Spring"];

interface TechnicalSkillsProps {
  formData: {
    skills: string[];
    skill_levels: Record<string, string>;
    areas_of_interest: string[];
    tools_frameworks: string[];
  };
  updateFormData: (updates: Partial<TechnicalSkillsProps["formData"]>) => void;
}

const TechnicalSkills: React.FC<TechnicalSkillsProps> = ({ formData, updateFormData }) => {
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedSkills = checked
      ? [...formData.skills, value]
      : formData.skills.filter(skill => skill !== value);
    
    updateFormData({ skills: updatedSkills });
  };

  const handleSkillLevelChange = (skill: string, level: string) => {
    const updatedSkillLevels = { ...formData.skill_levels, [skill]: level };
    updateFormData({ skill_levels: updatedSkillLevels });
  };

  const handleAreaOfInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedAreas = checked
      ? [...formData.areas_of_interest, value]
      : formData.areas_of_interest.filter(area => area !== value);
    
    updateFormData({ areas_of_interest: updatedAreas });
  };

  const handleToolFrameworkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedTools = checked
      ? [...formData.tools_frameworks, value]
      : formData.tools_frameworks.filter(tool => tool !== value);
    
    updateFormData({ tools_frameworks: updatedTools });
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
            <h3 className="text-sm font-medium text-blue-800">Technical Skills & Expertise</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Select the skills you have and indicate your proficiency level for each. This helps us match you with suitable teammates and projects.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technical Skills
        </label>
        <div className="space-y-3">
          {technicalSkills.map((skill) => (
            <div key={skill} className="border border-gray-200 rounded-md p-3">
              <div className="flex items-center">
                <input
                  id={`skill-${skill}`}
                  name="skills"
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleSkillChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`skill-${skill}`} className="ml-2 block text-sm font-medium text-gray-700">
                  {skill}
                </label>
              </div>
              
              {formData.skills.includes(skill) && (
                <div className="mt-2 pl-6">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Proficiency Level
                  </label>
                  <div className="flex space-x-4">
                    {proficiencyLevels.map((level) => (
                      <div key={level} className="flex items-center">
                        <input
                          id={`${skill}-${level}`}
                          name={`skill-level-${skill}`}
                          type="radio"
                          value={level}
                          checked={formData.skill_levels[skill] === level}
                          onChange={() => handleSkillLevelChange(skill, level)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={`${skill}-${level}`} className="ml-2 block text-xs text-gray-700">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Areas of Interest
        </label>
        <div className="grid grid-cols-2 gap-2">
          {areasOfInterest.map((area) => (
            <div key={area} className="flex items-center">
              <input
                id={`area-${area}`}
                name="areas_of_interest"
                type="checkbox"
                value={area}
                checked={formData.areas_of_interest.includes(area)}
                onChange={handleAreaOfInterestChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`area-${area}`} className="ml-2 block text-sm text-gray-700">
                {area}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tools & Frameworks
        </label>
        <div className="grid grid-cols-2 gap-2">
          {toolsFrameworks.map((tool) => (
            <div key={tool} className="flex items-center">
              <input
                id={`tool-${tool}`}
                name="tools_frameworks"
                type="checkbox"
                value={tool}
                checked={formData.tools_frameworks.includes(tool)}
                onChange={handleToolFrameworkChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`tool-${tool}`} className="ml-2 block text-sm text-gray-700">
                {tool}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-5">
        <div className="text-xs text-gray-500">
          Add your technical skills to help us match you with teammates who complement your expertise.
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills; 