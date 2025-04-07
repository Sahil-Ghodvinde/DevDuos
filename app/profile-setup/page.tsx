"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfileSetup() {
  const router = useRouter();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    full_name: "",
    email: "",
    phone_number: "",
    location: "",
    
    // Professional & Educational Background
    current_role: "",
    education_details: "",
    certifications: [],
    
    // Technical Skills & Expertise
    skills: [],
    skill_proficiencies: {},
    areas_of_interest: [],
    tools_frameworks: [],
    
    // Hackathon Experience & Goals
    hackathon_experience: false,
    previous_hackathons: [],
    hackathon_goals: [],
    preferred_team_size: "",
    
    // Team Role Preferences
    preferred_role: "",
    leadership_preference: "",
    collaboration_style: "",
    work_mode_preference: "",
    
    // Personality & Work Style
    personality_scale: 5,
    conflict_resolution_style: "",
    time_management_style: "",
    adaptability_rating: 3,
    
    // Document Uploads & External Profiles
    cv_file_path: "",
    portfolio_links: "",
    code_repo_links: "",
    linkedin_url: "",
    personal_website_url: "",
    
    // Availability & Contact Preferences
    time_zone: "",
    available_hours: [],
    contact_method: "",
    travel_relocation_preference: false,
    
    // Additional Information
    motivation_statement: "",
    project_ideas: "",
    additional_notes: ""
  });

  // Total number of steps
  const totalSteps = 9;

  const handleChoiceSelection = (choice: 'profile' | 'hackathons') => {
    if (choice === 'profile') {
      setShowProfileForm(true);
      setProgress(10); // Show initial progress
    } else {
      router.push('/'); // Navigate to home/hackathons page
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelectChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[name] as string[];
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter(item => item !== value) };
      }
    });
  };

  const handleToggleChange = (name: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillProficiencyChange = (skill: string, proficiency: string) => {
    setFormData(prev => ({
      ...prev,
      skill_proficiencies: {
        ...prev.skill_proficiencies,
        [skill]: proficiency
      }
    }));
  };

  const handleSliderChange = (name: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      setProgress(Math.floor((currentStep + 1) / totalSteps * 100));
    } else {
      // Submit the form
      console.log("Form submitted:", formData);
      router.push('/');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setProgress(Math.floor((currentStep - 1) / totalSteps * 100));
    }
  };

  const handleSkipToHackathons = () => {
    // Save what we have so far
    console.log("Partial form data:", formData);
    router.push('/');
  };

  // Initial choice screen
  if (!showProfileForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to DevKstra!</h1>
          <p className="text-gray-600 mb-8 text-center">
            Thank you for signing up. Would you like to complete your profile now or move directly to hackathons?
          </p>
          
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleChoiceSelection('profile')}
              className="bg-[#1e1894] text-white py-3 px-4 rounded-lg hover:bg-[#1e1894]/90 transition"
            >
              Complete My Profile
              <p className="text-xs mt-1 text-gray-200">
                (Fill in your profile to access the new Find Teammates feature)
              </p>
            </button>
            
            <button
              onClick={() => handleChoiceSelection('hackathons')}
              className="bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition"
            >
              Move to Hackathons Directly
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        {/* Progress bar */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">Complete Your Profile</h1>
            <span className="text-sm text-gray-600">{progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#1e1894] h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Step {currentStep} of {totalSteps}</span>
            <button 
              onClick={handleSkipToHackathons}
              className="text-blue-600 hover:underline"
            >
              Skip to Hackathons
            </button>
          </div>
        </div>

        {/* Form content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            key={currentStep}
          >
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <p className="text-gray-600 mb-6">This information is required for account creation.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select your location</option>
                      <option value="New York, NY, USA">New York, NY, USA</option>
                      <option value="Los Angeles, CA, USA">Los Angeles, CA, USA</option>
                      <option value="London, UK">London, UK</option>
                      <option value="Tokyo, Japan">Tokyo, Japan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional & Educational Background */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Professional & Educational Background</h2>
                <p className="text-gray-600 mb-6">Tell us about your education and professional experience.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Role/Occupation</label>
                    <select
                      name="current_role"
                      value={formData.current_role}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select your role</option>
                      <option value="Student">Student</option>
                      <option value="Professional">Professional</option>
                      <option value="Freelancer">Freelancer</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Level of Education</label>
                    <select
                      name="education_details"
                      value={formData.education_details}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select your education level</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Master's">Master's</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                    <div className="space-y-2">
                      {["AWS Certification", "Google Cloud Certification", "Microsoft Certification", "Other"].map(cert => (
                        <div key={cert} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`cert-${cert}`}
                            checked={(formData.certifications as string[]).includes(cert)}
                            onChange={(e) => handleMultiSelectChange('certifications', cert, e.target.checked)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`cert-${cert}`} className="ml-2 text-sm text-gray-700">{cert}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Technical Skills & Expertise */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Technical Skills & Expertise</h2>
                <p className="text-gray-600 mb-6">Share your technical abilities and interests.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
                    <div className="space-y-2">
                      {["JavaScript", "Python", "Java", "C++", "Ruby", "Go"].map(skill => (
                        <div key={skill} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`skill-${skill}`}
                            checked={(formData.skills as string[]).includes(skill)}
                            onChange={(e) => handleMultiSelectChange('skills', skill, e.target.checked)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`skill-${skill}`} className="ml-2 text-sm text-gray-700">{skill}</label>
                          
                          {(formData.skills as string[]).includes(skill) && (
                            <div className="ml-6 flex items-center">
                              {["Beginner", "Intermediate", "Advanced"].map(level => (
                                <label key={level} className="inline-flex items-center mr-4">
                                  <input
                                    type="radio"
                                    name={`proficiency-${skill}`}
                                    value={level}
                                    checked={formData.skill_proficiencies[skill] === level}
                                    onChange={() => handleSkillProficiencyChange(skill, level)}
                                    className="h-4 w-4 text-blue-600"
                                  />
                                  <span className="ml-1 text-xs text-gray-700">{level}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                    <div className="space-y-2">
                      {["Web Development", "Mobile Apps", "Data Science", "AI/ML", "Game Development"].map(area => (
                        <div key={area} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`interest-${area}`}
                            checked={(formData.areas_of_interest as string[]).includes(area)}
                            onChange={(e) => handleMultiSelectChange('areas_of_interest', area, e.target.checked)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`interest-${area}`} className="ml-2 text-sm text-gray-700">{area}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tools & Frameworks</label>
                    <div className="space-y-2">
                      {["React", "Angular", "Vue", "Django", "Flask", "Spring"].map(tool => (
                        <div key={tool} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`tool-${tool}`}
                            checked={(formData.tools_frameworks as string[]).includes(tool)}
                            onChange={(e) => handleMultiSelectChange('tools_frameworks', tool, e.target.checked)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`tool-${tool}`} className="ml-2 text-sm text-gray-700">{tool}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Hackathon Experience & Goals */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Hackathon Experience & Goals</h2>
                <p className="text-gray-600 mb-6">Tell us about your hackathon experience and what you hope to achieve.</p>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you participated in hackathons before?
                    </label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          checked={formData.hackathon_experience === true}
                          onChange={() => handleToggleChange('hackathon_experience', true)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          checked={formData.hackathon_experience === false}
                          onChange={() => handleToggleChange('hackathon_experience', false)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                  
                  {formData.hackathon_experience && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Previous Hackathons</label>
                      <div className="space-y-2">
                        {["Hackathon A", "Hackathon B", "Hackathon C", "Other"].map(hack => (
                          <div key={hack} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`hack-${hack}`}
                              checked={(formData.previous_hackathons as string[]).includes(hack)}
                              onChange={(e) => handleMultiSelectChange('previous_hackathons', hack, e.target.checked)}
                              className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor={`hack-${hack}`} className="ml-2 text-sm text-gray-700">{hack}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hackathon Goals</label>
                    <div className="space-y-2">
                      {["Networking", "Skill Development", "Winning Prizes", "Learning", "Exploring Ideas"].map(goal => (
                        <div key={goal} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`goal-${goal}`}
                            checked={(formData.hackathon_goals as string[]).includes(goal)}
                            onChange={(e) => handleMultiSelectChange('hackathon_goals', goal, e.target.checked)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`goal-${goal}`} className="ml-2 text-sm text-gray-700">{goal}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Team Size</label>
                    <select
                      name="preferred_team_size"
                      value={formData.preferred_team_size}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select preferred team size</option>
                      <option value="Solo">Solo</option>
                      <option value="2-3">2-3</option>
                      <option value="4-5">4-5</option>
                      <option value="6+">6+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevStep}
                className={`px-4 py-2 rounded-lg ${currentStep === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              
              <button
                onClick={handleNextStep}
                className="px-4 py-2 bg-[#1e1894] text-white rounded-lg hover:bg-[#1e1894]/90"
              >
                {currentStep === totalSteps ? 'Submit' : 'Next'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 