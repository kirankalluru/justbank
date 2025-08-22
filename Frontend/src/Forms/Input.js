import React from "react";
import {
  UserIcon,
  HomeIcon,
  UsersIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckBadgeIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

// Map input names to their respective icons
const iconMap = {
  Gender: UserIcon,
  Married: HomeIcon,
  Dependents: UsersIcon,
  Education: AcademicCapIcon,
  Self_Employed: BriefcaseIcon,
  ApplicantIncome: CurrencyDollarIcon,
  CoapplicantIncome: CurrencyDollarIcon,
  LoanAmount: CreditCardIcon,
  Loan_Amount_Term: ClockIcon,
  Credit_History: CheckBadgeIcon,
  Property_Area: MapPinIcon,
};

export default function Input({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  options = null, // for select inputs
  required = false,
  disabled = false,
  error = "", // optional error message
}) {
  const Icon = iconMap[name];
  const inputId = `input-${name}`;

  return (
    <div className="mb-4">
      {/* Label with Icon */}
      <label
        htmlFor={inputId}
        className="flex items-center text-sm font-medium text-gray-700 mb-1"
      >
        {Icon && <Icon className="h-4 w-4 mr-2 text-indigo-500" />}
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Select input */}
      {options ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full p-2.5 rounded-lg border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100`}
        >
          <option value="" disabled>
            {placeholder || `Select ${label}`}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        // Standard input
        <input
          id={inputId}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full p-2.5 rounded-lg border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100`}
        />
      )}

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
