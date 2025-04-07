import React from "react";

interface AdditionalInfoProps {
  formData: {
    motivation_statement: string;
    project_ideas: string;
    additional_notes: string;
  };
  updateFormData: (updates: Partial<AdditionalInfoProps["formData"]>) => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            <h3 className="text-sm font-medium text-blue-800">Additional Information</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Share more about your motivations, project ideas, and anything else you&apos;d like potential teammates to know.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="motivation_statement" className="block text-sm font-medium text-gray-700">
          Motivation Statement
        </label>
        <div className="mt-1">
          <textarea
            id="motivation_statement"
            name="motivation_statement"
            rows={3}
            value={formData.motivation_statement}
            onChange={handleChange}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="What motivates you to participate in hackathons and collaborative projects?"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Briefly explain what drives you to join hackathons and why you&apos;re eager to collaborate with others.
        </p>
      </div>

      <div>
        <label htmlFor="project_ideas" className="block text-sm font-medium text-gray-700">
          Project Ideas
        </label>
        <div className="mt-1">
          <textarea
            id="project_ideas"
            name="project_ideas"
            rows={3}
            value={formData.project_ideas}
            onChange={handleChange}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Do you have any project ideas or concepts you'd like to work on?"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Share any project ideas you have or would be excited to work on with a team.
        </p>
      </div>

      <div>
        <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <div className="mt-1">
          <textarea
            id="additional_notes"
            name="additional_notes"
            rows={3}
            value={formData.additional_notes}
            onChange={handleChange}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Anything else you'd like potential teammates to know about you?"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Is there anything else you&apos;d like to share that might help find great teammates?
        </p>
      </div>

      <div className="border-t border-gray-200 pt-5">
        <div className="text-xs text-gray-500">
          This information helps potential teammates understand your motivations and interests.
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo; 