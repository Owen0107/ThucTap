import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { studentApi } from './services/api';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentApi.getAll();
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students. Please make sure the JSON server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce could be added here for better performance
    try {
      if (query.trim() === '') {
        fetchStudents();
      } else {
        const response = await studentApi.search(query);
        setStudents(response.data);
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleSave = async (studentData) => {
    try {
      if (currentStudent) {
        await studentApi.update(currentStudent.id, studentData);
      } else {
        await studentApi.create(studentData);
      }
      fetchStudents();
      setIsFormOpen(false);
      setCurrentStudent(null);
    } catch (err) {
      setError('Failed to save student data.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentApi.delete(id);
        fetchStudents();
      } catch (err) {
        setError('Failed to delete student.');
        console.error(err);
      }
    }
  };

  const openCreateForm = () => {
    setCurrentStudent(null);
    setIsFormOpen(true);
  };

  const openEditForm = (student) => {
    setCurrentStudent(student);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#f0fdfa] relative overflow-hidden font-sans text-slate-800">
      {/* Mint Fresh Breeze Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, 
              rgba(240,253,250,1) 0%, 
              rgba(204,251,241,0.7) 30%, 
              rgba(153,246,228,0.5) 60%, 
              rgba(94,234,212,0.4) 100%
            ),
            radial-gradient(circle at 40% 30%, rgba(255,255,255,0.8) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(167,243,208,0.5) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(209,250,229,0.6) 0%, transparent 45%)
          `,
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-teal-900 mb-4 tracking-tight">
            Student Management
          </h1>
          <p className="text-xl text-teal-700 max-w-2xl mx-auto">
            Manage student records with ease.
          </p>
        </motion.header>

        {/* Controls Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm"
        >
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-none bg-white/60 focus:bg-white focus:ring-2 focus:ring-teal-300 transition-all shadow-sm outline-none text-teal-900 placeholder-teal-400/70"
            />
            <svg className="w-5 h-5 text-teal-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <button
            onClick={openCreateForm}
            className="w-full md:w-auto px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-500/30 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Student
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section (Conditional or Side-by-side on large screens if needed, but here using conditional rendering for simplicity in layout) */}
          {isFormOpen && (
            <div className="lg:col-span-1 lg:sticky lg:top-8 h-fit z-20">
              <StudentForm 
                currentStudent={currentStudent} 
                onSave={handleSave} 
                onCancel={() => setIsFormOpen(false)} 
              />
            </div>
          )}

          {/* List Section */}
          <div className={`${isFormOpen ? 'lg:col-span-2' : 'lg:col-span-3'} transition-all duration-500`}>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              </div>
            ) : (
              <StudentList 
                students={students} 
                onEdit={openEditForm} 
                onDelete={handleDelete} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;