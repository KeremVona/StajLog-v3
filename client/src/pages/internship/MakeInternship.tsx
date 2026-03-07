import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  makeInternship,
  reset,
} from "../../features/internship/internshipSlice";
import type { MakeInternshipDTO } from "../../interfaces/InternshipInterfaces";

export default function AddInternship() {
  const [formData, setFormData] = useState<MakeInternshipDTO>({
    title: "",
    companyName: "",
    startDate: "",
    endDate: "",
    templateId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { currentInternship, isLoading, isError, isSuccess, message } =
    useAppSelector((state) => state.internships);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || currentInternship) {
      navigate("/home");
    }
    dispatch(reset());
  }, [currentInternship, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: MakeInternshipDTO = {
        ...formData,
        endDate: formData.endDate ? formData.endDate : null,
        templateId: formData.templateId ? formData.templateId : null,
      };

      console.log("Submitting DTO:", payload);

      dispatch(makeInternship(payload));

      alert("Internship added successfully!");

      setFormData({
        title: "",
        companyName: "",
        startDate: "",
        endDate: "",
        templateId: "",
      });

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.error("Error adding internship:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Add New Internship</h2>
        <p className="text-sm text-gray-500 mt-1">
          Record a new internship experience to your log.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Internship Role / Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Software Engineering Intern"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            required
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Acme Corp"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              value={formData.startDate as string}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* End Date */}
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={(formData.endDate as string) || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Template ID (Optional) */}
        <div>
          <label
            htmlFor="templateId"
            className="block text-sm font-medium text-gray-700"
          >
            Log Template{" "}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <select
            id="templateId"
            name="templateId"
            value={(formData.templateId as string) || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select a template...</option>
            <option value="template-1">Standard Daily Log</option>
            <option value="template-2">Weekly Summary Log</option>
            <option value="template-3">Project-Based Log</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {isSubmitting ? "Saving..." : "Add Internship"}
          </button>
        </div>
      </form>
    </div>
  );
}
