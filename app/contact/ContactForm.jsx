"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { saveContact } from "@/app/actions/saveContact"; 

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const result = await saveContact(formData); 
    console.log(formData,"ffffffffffffffffff")

    if (result.success) {
      console.log("Form saved to DB:", result.data);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        subject: "", // if included
        message: "",
      });

      // Optional: reset the submitted state after delay
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      console.error("Error:", result.error);
      // Optionally show error message to user
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    // Optionally show a fallback error
  } finally {
    setIsSubmitting(false);
  }
};


  const SuccessMessage = () => (
    <div className="text-center py-12">
      <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
      <h3 className="text-xl font-bold mb-2 text-sky-800 dark:text-slate-100">
        Message Sent Successfully!
      </h3>
      <p className="text-sky-600 dark:text-slate-300">
        We'll get back to you within 24 hours.
      </p>
    </div>
  );

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-sky-800 dark:text-slate-100">
        Contact Us
      </h2>

      {isSubmitted ? (
        <SuccessMessage />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="0200 000 000"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Service Interest
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select a service</option>
              <option value="installation">Installation</option>
              <option value="maintenance">Maintenance</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-2 border rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Tell us about your solar needs..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
