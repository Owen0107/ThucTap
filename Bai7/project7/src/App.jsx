import Layout from './components/Layout'
import Modal from './components/Modal'
import EmployeeForm from './components/EmployeeForm'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import useUIStore from './store/useUIStore'
import useEmployeeStore from './store/useEmployeeStore'

function App() {
  const { currentPage, isModalOpen, editingEmployee, closeModal } = useUIStore()
  const { addEmployee, updateEmployee } = useEmployeeStore()

  const handleSubmit = (data) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, data)
    } else {
      addEmployee(data)
    }
    closeModal()
  }

  return (
    <Layout>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'employees' && <Employees />}

      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
      >
        <EmployeeForm 
          onSubmit={handleSubmit}
          initialData={editingEmployee}
          onCancel={closeModal}
        />
      </Modal>
    </Layout>
  )
}

export default App
