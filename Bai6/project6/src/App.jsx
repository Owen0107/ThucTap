import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import EmployeeTable from './components/EmployeeTable'
import Modal from './components/Modal'
import EmployeeForm from './components/EmployeeForm'
import { employees as initialEmployees } from './data/mockData'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [employees, setEmployees] = useState(initialEmployees)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleAddEmployee = (data) => {
    const newEmployee = {
      ...data,
      id: Math.max(...employees.map(e => e.id)) + 1,
      salary: Number(data.salary)
    }
    setEmployees([...employees, newEmployee])
    setIsModalOpen(false)
  }

  const handleEditEmployee = (data) => {
    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id 
        ? { ...data, id: emp.id, salary: Number(data.salary) }
        : emp
    ))
    setEditingEmployee(null)
    setIsModalOpen(false)
  }

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  const openAddModal = () => {
    setEditingEmployee(null)
    setIsModalOpen(true)
  }

  const openEditModal = (employee) => {
    setEditingEmployee(employee)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen w-full bg-[#f0fdfa] relative">
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
      
      <div className="relative z-10 flex min-h-screen">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          sidebarOpen={sidebarOpen}
        />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <Header 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          <main className="flex-1 p-6">
            {currentPage === 'dashboard' && (
              <Dashboard employees={employees} />
            )}
            
            {currentPage === 'employees' && (
              <EmployeeTable 
                employees={employees}
                onAdd={openAddModal}
                onEdit={openEditModal}
                onDelete={handleDeleteEmployee}
              />
            )}
          </main>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false)
          setEditingEmployee(null)
        }}
        title={editingEmployee ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
      >
        <EmployeeForm 
          onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
          initialData={editingEmployee}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingEmployee(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default App
