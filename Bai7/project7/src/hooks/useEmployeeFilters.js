import { useState, useMemo } from 'react'

const useEmployeeFilters = (employees, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase())
      const matchDepartment = !filterDepartment || emp.department === filterDepartment
      const matchStatus = !filterStatus || emp.status === filterStatus
      return matchSearch && matchDepartment && matchStatus
    })
  }, [employees, searchTerm, filterDepartment, filterStatus])

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  const resetFilters = () => {
    setSearchTerm('')
    setFilterDepartment('')
    setFilterStatus('')
    setCurrentPage(1)
  }

  const updateSearch = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const updateDepartmentFilter = (value) => {
    setFilterDepartment(value)
    setCurrentPage(1)
  }

  const updateStatusFilter = (value) => {
    setFilterStatus(value)
    setCurrentPage(1)
  }

  return {
    filteredEmployees,
    paginatedEmployees,
    currentPage,
    totalPages,
    searchTerm,
    filterDepartment,
    filterStatus,
    setCurrentPage,
    updateSearch,
    updateDepartmentFilter,
    updateStatusFilter,
    resetFilters,
    totalFiltered: filteredEmployees.length
  }
}

export default useEmployeeFilters
