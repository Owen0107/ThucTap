import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-100 hover:border-teal-200 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl">
                {student.name.charAt(0)}
              </div>
              <div className="bg-teal-50 px-3 py-1 rounded-full text-xs font-medium text-teal-700">
                GPA: {student.gpa}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-teal-900 mb-1">{student.name}</h3>
            <p className="text-slate-500 text-sm mb-3">{student.email}</p>
            
            <div className="border-t border-teal-50 pt-3 mt-2">
              <p className="text-sm text-teal-700 font-medium mb-4">
                <span className="text-slate-400 font-normal">Major:</span> {student.major}
              </p>
              
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => onEdit(student)}
                  className="flex-1 px-3 py-1.5 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(student.id)}
                  className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {students.length === 0 && (
        <div className="col-span-full text-center py-12 text-slate-500">
          No students found.
        </div>
      )}
    </div>
  );
};

export default StudentList;