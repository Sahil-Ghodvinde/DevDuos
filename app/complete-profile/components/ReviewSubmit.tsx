import React from "react";

interface ReviewSubmitProps {
  formData: {
    // Personal Information
    full_name: string;
    email: string;
    phone_number: string;
    location: string;
    
    // Professional & Educational Background
    current_role: string;
    education_details: string;
    certifications: string[];
    
    // Technical Skills & Expertise
    skills: string[];
    skill_levels: Record<string, string>;
    areas_of_interest: string[];
    tools_frameworks: string[];
    
    // Hackathon Experience & Goals
    hackathon_experience: boolean;
    previous_hackathons: string[];
    hackathon_goals: string[];
    preferred_team_size: string;
    
    // Team Role Preferences & Collaboration Style
    preferred_role: string;
    leadership_preference: string;
    collaboration_style: string;
    work_mode_preference: string;
    
    // Personality & Work Style
    personality_scale: number;
    conflict_resolution_style: string;
    time_management_style: string;
    adaptability_rating: number;
    
    // Document Uploads & External Profiles
    cv_file_path: string;
    portfolio_links: string;
    code_repo_links: string;
    linkedin_url: string;
    personal_website_url: string;
    
    // Availability & Contact Preferences
    time_zone: string;
    available_hours: string[];
    contact_method: string;
    travel_relocation_preference: boolean;
    
    // Additional Information
    motivation_statement: string;
    project_ideas: string;
    additional_notes: string;
  };
}

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({ formData }) => {
  // Helper function to render a section
  const renderSection = (title: string, items: React.ReactNode) => (
    <div className="bg-white shadow-sm rounded-md p-4 mb-4">
      <h3 className="text-lg font-medium text-gray-900 mb-3">{title}</h3>
      <div className="space-y-3">
        {items}
      </div>
    </div>
  );

  // Helper function to render a field
  const renderField = (label: string, value: React.ReactNode) => (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || <span className="text-gray-400">Not provided</span>}</dd>
    </div>
  );

  // Render array items
  const renderArrayItems = (items: string[]) => {
    if (!items || items.length === 0) return <span className="text-gray-400">None selected</span>;
    
    return (
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-sm">{item}</li>
        ))}
      </ul>
    );
  };

  // Render skills with proficiency
  const renderSkills = () => {
    if (!formData.skills || formData.skills.length === 0) {
      return <span className="text-gray-400">No skills selected</span>;
    }
    
    return (
      <ul className="list-disc pl-5 space-y-1">
        {formData.skills.map((skill, index) => (
          <li key={index} className="text-sm">
            {skill} {formData.skill_levels[skill] && `(${formData.skill_levels[skill]})`}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Almost done!</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Please review your information before submitting. You can go back to any section to make changes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      {renderSection("Personal Information", (
        <>
          {renderField("Full Name", formData.full_name)}
          {renderField("Email", formData.email)}
          {renderField("Phone Number", formData.phone_number)}
          {renderField("Location", formData.location)}
        </>
      ))}

      {/* Professional & Educational Background */}
      {renderSection("Professional & Educational Background", (
        <>
          {renderField("Current Role", formData.current_role)}
          {renderField("Education", formData.education_details)}
          {renderField("Certifications", renderArrayItems(formData.certifications))}
        </>
      ))}

      {/* Technical Skills */}
      {renderSection("Technical Skills & Expertise", (
        <>
          {renderField("Skills", renderSkills())}
          {renderField("Areas of Interest", renderArrayItems(formData.areas_of_interest))}
          {renderField("Tools & Frameworks", renderArrayItems(formData.tools_frameworks))}
        </>
      ))}

      {/* Hackathon Experience */}
      {renderSection("Hackathon Experience & Goals", (
        <>
          {renderField("Has Hackathon Experience", formData.hackathon_experience ? "Yes" : "No")}
          {formData.hackathon_experience && renderField("Previous Hackathons", renderArrayItems(formData.previous_hackathons))}
          {renderField("Hackathon Goals", renderArrayItems(formData.hackathon_goals))}
          {renderField("Preferred Team Size", formData.preferred_team_size)}
        </>
      ))}

      {/* Team Preferences */}
      {renderSection("Team Role Preferences", (
        <>
          {renderField("Preferred Role", formData.preferred_role)}
          {renderField("Leadership Preference", formData.leadership_preference)}
          {renderField("Collaboration Style", formData.collaboration_style)}
          {renderField("Work Mode", formData.work_mode_preference)}
        </>
      ))}

      {/* Personality & Work Style */}
      {renderSection("Personality & Work Style", (
        <>
          {renderField("Personality Scale", `${formData.personality_scale}/10 (Introvert to Extrovert)`)}
          {renderField("Conflict Resolution", formData.conflict_resolution_style)}
          {renderField("Time Management", formData.time_management_style)}
          {renderField("Adaptability", `${formData.adaptability_rating}/5`)}
        </>
      ))}

      {/* Documents & Profiles */}
      {renderSection("Documents & External Profiles", (
        <>
          {renderField("Resume", formData.cv_file_path)}
          {renderField("Portfolio Links", formData.portfolio_links)}
          {renderField("Code Repositories", formData.code_repo_links)}
          {renderField("LinkedIn", formData.linkedin_url)}
          {renderField("Personal Website", formData.personal_website_url)}
        </>
      ))}

      {/* Availability */}
      {renderSection("Availability & Contact Preferences", (
        <>
          {renderField("Time Zone", formData.time_zone)}
          {renderField("Available Hours", renderArrayItems(formData.available_hours))}
          {renderField("Preferred Contact Method", formData.contact_method)}
          {renderField("Willing to Travel/Relocate", formData.travel_relocation_preference ? "Yes" : "No")}
        </>
      ))}

      {/* Additional Information */}
      {renderSection("Additional Information", (
        <>
          {renderField("Motivation", formData.motivation_statement)}
          {renderField("Project Ideas", formData.project_ideas)}
          {renderField("Additional Notes", formData.additional_notes)}
        </>
      ))}

      <div className="border-t border-gray-200 pt-5">
        <div className="text-sm text-gray-500">
          Please review all information for accuracy before submitting your profile.
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit; 