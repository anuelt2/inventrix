import { useState } from "react";


export const Form = ({
  fields,
  onSubmit,
  buttonText = "Submit",
  title = "Form",
  initialValues = {},
  errorMessages = {},
}) => {
  const [formData, setFormData] = useState(initialValues);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-gray-900 text-2xl font-bl=old mb-4 text-center">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 border-gray-600">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-semibold mb-1">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                  {field.options.map((option) => (
                    <option key={option.id} id={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
                  className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              )}
              {errorMessages[field.name] && (
                <p className="text-red-500 text-sm mt-2">
                  {errorMessages[field.name]}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
