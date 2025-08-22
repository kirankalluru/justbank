import { useState } from "react";
import axios from "axios";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Input from "./Input"; // Import the reusable component

export default function LoanForm() {
  const [formData, setFormData] = useState({
    Gender: "Male",
    Married: "Yes",
    Dependents: 0,
    Education: "Graduate",
    Self_Employed: "No",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: 360,
    Credit_History: 1,
    Property_Area: "Urban",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to get prediction" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="max-w-xl w-full mx-auto p-8 bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-emerald-400">
            Loan Application
          </h2>
          <p className="text-gray-400 mt-2 text-center">
            Fill out the form below to get an instant loan approval prediction.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Gender"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
          />
          <Input
            label="Marital Status"
            name="Married"
            value={formData.Married}
            onChange={handleChange}
            options={[
              { label: "Married", value: "Yes" },
              { label: "Single", value: "No" },
            ]}
          />
          <Input
            label="Number of Dependents"
            name="Dependents"
            type="number"
            placeholder="e.g., 2"
            value={formData.Dependents}
            onChange={handleChange}
          />
          <Input
            label="Education"
            name="Education"
            value={formData.Education}
            onChange={handleChange}
            options={[
              { label: "Graduate", value: "Graduate" },
              { label: "Not Graduate", value: "Not Graduate" },
            ]}
          />
          <Input
            label="Self Employed"
            name="Self_Employed"
            value={formData.Self_Employed}
            onChange={handleChange}
            options={[
              { label: "No", value: "No" },
              { label: "Yes", value: "Yes" },
            ]}
          />
          <Input
            label="Applicant Income"
            name="ApplicantIncome"
            type="number"
            placeholder="e.g., 50000"
            value={formData.ApplicantIncome}
            onChange={handleChange}
          />
          <Input
            label="Co-applicant Income"
            name="CoapplicantIncome"
            type="number"
            placeholder="e.g., 20000"
            value={formData.CoapplicantIncome}
            onChange={handleChange}
          />
          <Input
            label="Loan Amount"
            name="LoanAmount"
            type="number"
            placeholder="e.g., 150000"
            value={formData.LoanAmount}
            onChange={handleChange}
          />
          <Input
            label="Loan Term (in months)"
            name="Loan_Amount_Term"
            type="number"
            placeholder="e.g., 360"
            value={formData.Loan_Amount_Term}
            onChange={handleChange}
          />
          <Input
            label="Credit History"
            name="Credit_History"
            value={formData.Credit_History}
            onChange={handleChange}
            options={[
              { label: "Good (1)", value: 1 },
              { label: "Bad (0)", value: 0 },
            ]}
          />
          <Input
            label="Property Area"
            name="Property_Area"
            value={formData.Property_Area}
            onChange={handleChange}
            options={[
              { label: "Urban", value: "Urban" },
              { label: "Semiurban", value: "Semiurban" },
              { label: "Rural", value: "Rural" },
            ]}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/40"
          >
            <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
            Predict Loan Status
          </button>
        </form>

        {/* Result */}
        {result && (
          <div
            className={`mt-6 p-6 rounded-2xl border shadow-inner ${
              result.error
                ? "bg-red-900/20 border-red-600 text-red-400"
                : "bg-emerald-900/20 border-emerald-600 text-emerald-400"
            }`}
          >
            {result.error ? (
              <p className="font-medium text-center">{result.error}</p>
            ) : (
              <div className="space-y-2 text-center">
                <p className="text-xl font-bold">
                  Loan Status:{" "}
                  <span
                    className={`font-extrabold ${
                      result.loan_status === "Approved"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {result.loan_status}
                  </span>
                </p>
                {result.approval_probability && (
                  <p className="text-gray-400 text-sm">
                    Approval Probability:{" "}
                    <span className="font-semibold text-white">
                      {(result.approval_probability * 100).toFixed(2)}%
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center py-4 text-gray-500 text-sm">
          <span className="mr-1">Powered by</span>
          <span className="font-semibold text-emerald-400">AI</span>
        </div>
      </div>
    </div>
  );
}
