import React, { useState } from "react";

interface DocumentUploadsProps {
  formData: {
    cv_file_path: string;
    portfolio_links: string;
    code_repo_links: string;
    linkedin_url: string;
    personal_website_url: string;
  };
  updateFormData: (updates: Partial<DocumentUploadsProps["formData"]>) => void;
}

const DocumentUploads: React.FC<DocumentUploadsProps> = ({ formData, updateFormData }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // In a real application, you would upload the file to a server here
      // and update formData.cv_file_path with the URL or path
      updateFormData({ cv_file_path: file.name }); // For now, just save the filename
    }
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
            <h3 className="text-sm font-medium text-blue-800">Documents & External Profiles</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Share links to your online profiles and upload your resume to help potential teammates learn more about your background.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CV/Resume Upload
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            <span>Upload CV</span>
            <input
              type="file"
              name="cv_file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
          {fileName && (
            <div className="text-sm text-gray-500 flex items-center">
              <svg className="h-4 w-4 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {fileName}
            </div>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX up to 5MB</p>
      </div>

      <div>
        <label htmlFor="portfolio_links" className="block text-sm font-medium text-gray-700">
          Portfolio/Project Samples
        </label>
        <input
          type="text"
          name="portfolio_links"
          id="portfolio_links"
          value={formData.portfolio_links}
          onChange={handleTextChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="https://portfolio.example.com (separate multiple links with commas)"
        />
        <p className="mt-1 text-xs text-gray-500">
          Add links to your portfolio or project samples. Separate multiple links with commas.
        </p>
      </div>

      <div>
        <label htmlFor="code_repo_links" className="block text-sm font-medium text-gray-700">
          Code Repositories
        </label>
        <input
          type="text"
          name="code_repo_links"
          id="code_repo_links"
          value={formData.code_repo_links}
          onChange={handleTextChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="https://github.com/yourusername (separate multiple links with commas)"
        />
        <p className="mt-1 text-xs text-gray-500">
          GitHub, GitLab, BitBucket, etc. Separate multiple links with commas.
        </p>
      </div>

      <div>
        <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700">
          LinkedIn Profile URL
        </label>
        <input
          type="text"
          name="linkedin_url"
          id="linkedin_url"
          value={formData.linkedin_url}
          onChange={handleTextChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="https://linkedin.com/in/yourusername"
        />
      </div>

      <div>
        <label htmlFor="personal_website_url" className="block text-sm font-medium text-gray-700">
          Personal Website URL
        </label>
        <input
          type="text"
          name="personal_website_url"
          id="personal_website_url"
          value={formData.personal_website_url}
          onChange={handleTextChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div className="border-t border-gray-200 pt-5">
        <div className="text-xs text-gray-500">
          Adding links to your external profiles helps showcase your skills and experience to potential teammates.
        </div>
      </div>
    </div>
  );
};

export default DocumentUploads; 