import React from "react";

const timeZones = [
  "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00",
  "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00",
  "UTC+00:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00",
  "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00",
  "UTC+12:00", "UTC+13:00", "UTC+14:00"
];

const availableHours = [
  "Morning (8AM-12PM)",
  "Afternoon (12PM-5PM)",
  "Evening (5PM-9PM)"
];

const contactMethods = [
  "Email",
  "Phone",
  "Messaging Apps"
];

interface AvailabilityPreferencesProps {
  formData: {
    time_zone: string;
    available_hours: string[];
    contact_method: string;
    travel_relocation_preference: boolean;
  };
  updateFormData: (updates: Partial<AvailabilityPreferencesProps["formData"]>) => void;
}

const AvailabilityPreferences: React.FC<AvailabilityPreferencesProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedHours = checked
      ? [...formData.available_hours, value]
      : formData.available_hours.filter(hour => hour !== value);
    
    updateFormData({ available_hours: updatedHours });
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateFormData({ [name]: checked });
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
            <h3 className="text-sm font-medium text-blue-800">Availability & Contact Preferences</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Tell us about your availability and preferred contact methods to help coordinate team communication.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="time_zone" className="block text-sm font-medium text-gray-700">
          Time Zone
        </label>
        <select
          id="time_zone"
          name="time_zone"
          value={formData.time_zone}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select your time zone</option>
          {timeZones.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Hours
        </label>
        <div className="space-y-2">
          {availableHours.map((hour) => (
            <div key={hour} className="flex items-center">
              <input
                id={`hour-${hour}`}
                name="available_hours"
                type="checkbox"
                value={hour}
                checked={formData.available_hours.includes(hour)}
                onChange={handleHoursChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`hour-${hour}`} className="ml-2 block text-sm text-gray-700">
                {hour}
              </label>
            </div>
          ))}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Select all times when you&apos;re typically available to work on projects (in your local time zone).
        </p>
      </div>

      <div>
        <label htmlFor="contact_method" className="block text-sm font-medium text-gray-700">
          Preferred Contact Method
        </label>
        <select
          id="contact_method"
          name="contact_method"
          value={formData.contact_method}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select your preferred contact method</option>
          {contactMethods.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="travel_relocation_preference"
              name="travel_relocation_preference"
              type="checkbox"
              checked={formData.travel_relocation_preference}
              onChange={handleToggleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="travel_relocation_preference" className="font-medium text-gray-700">
              Willingness to Relocate/Travel
            </label>
            <p className="text-gray-500">
              Are you willing to travel or relocate for in-person events or projects?
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-5">
        <div className="text-xs text-gray-500">
          Knowing your availability helps match you with teammates in compatible time zones.
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPreferences; 