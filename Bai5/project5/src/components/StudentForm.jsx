import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StudentForm = ({ currentStudent, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    gpa: '',
  });

  useEffect(() => {
    if (currentStudent) {
      setFormData(currentStudent);
    } else {
      setFormData({ name: '', email: '', major: '', gpa: '' });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-teal-100"
    >
      <h3 className="text-2xl font-bold text-teal-900 mb-6">
        {currentStudent ? 'Edit Student' : 'Add New Student'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white/50"
            placeholder="Enter student name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white/50"
            placeholder="Enter email address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">Major</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white/50"
            placeholder="Enter major"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">GPA</label>
          <input
            type="number"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            required
            step="0.1"
            min="0"
            max="4"
            className="w-full px-4 py-2 rounded-lg border border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white/50"
            placeholder="Enter GPA (0.0 - 4.0)"
          />
        </div>
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="flex-1 px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg"
          >
            {currentStudent ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StudentForm;