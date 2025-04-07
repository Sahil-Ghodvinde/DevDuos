import React from "react";

const roles = ["Student", "Professional", "Freelancer"];
const educationLevels = ["High School", "Bachelor's", "Master's", "PhD", "Other"];
const certifications = [
  "AWS Certification",
  "Google Cloud Certification",
  "Microsoft Certification",
  "Other"
];

interface ProfessionalInfoProps {
  formData: {
    current_role: string;
    education_details: string;
    certifications: string[];
  };
  updateFormData: (updates: Partial<ProfessionalInfoProps["formData"]>) => void;
}

const ProfessionalInfo: React.FC<ProfessionalInfoProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedCertifications = checked
      ? [...formData.certifications, value]
      : formData.certifications.filter(cert => cert !== value);
    
    updateFormData({ certifications: updatedCertifications });
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
            <h3 className="text-sm font-medium text-blue-800">Professional Background</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>This information helps us understand your professional background. All fields in this section are optional.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="current_role" className="block text-sm font-medium text-gray-700">
          Current Role/Occupation
        </label>
        <select
          id="current_role"
          name="current_role"
          value={formData.current_role}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select your current role</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="education_details" className="block text-sm font-medium text-gray-700">
          Highest Level of Education & Field of Study
        </label>
        <select
          id="education_details"
          name="education_details"
          value={formData.education_details}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select your education level</option>
          {educationLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certifications or Additional Courses
        </label>
        <div className="space-y-2">
          {certifications.map((certification) => (
            <div key={certification} className="flex items-center">
              <input
                id={`certification-${certification}`}
                name="certifications"
                type="checkbox"
                value={certification}
                checked={formData.certifications.includes(certification)}
                onChange={handleCertificationChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`certification-${certification}`} className="ml-2 block text-sm text-gray-700">
                {certification}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-5">
        <div className="text-xs text-gray-500">
          All fields in this section are optional and can help match you with suitable teammates.
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo; 