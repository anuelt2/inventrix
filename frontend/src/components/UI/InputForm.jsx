import { useState } from "react";

export const Form = ({
  fields,
  onSubmit,
  buttonText = "Submit",
  title = "Form",
  initialValues = {},
  errorMessage = "",
}) => {
  const [formData, setFormData] = useState(initialValues);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <h2 className="text-gray-900 text-2xl font-bl=old mb-4 text-center">
        {title}
      </h2>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 text-left font-semibold mb-1">
              {field.label}
            </label>
            {field.type === "select" ? (
              <div className="relative w-full">
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required !== false}
                  className="w-full p-2 border text-gray-700 appearance-none border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
                >
                  <option>Select</option>
                  {field.options.map((option) => (
                    <option key={option.id} id={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
                rows="4"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                autoComplete=""
                required={field.required !== false}
                className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default Form;
