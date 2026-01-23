function Sidebar({ currentPage, setCurrentPage, sidebarOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'employees', label: 'Nhân viên' },
  ]

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-sm border-r border-teal-100 transition-all duration-300 z-20 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4 border-b border-teal-100">
        <h1 className={`font-bold text-teal-700 transition-all duration-300 ${
          sidebarOpen ? 'text-xl' : 'text-sm text-center'
        }`}>
          {sidebarOpen ? 'Admin Panel' : 'AP'}
        </h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li 
              key={item.id}
              className="animate-slide-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                  currentPage === item.id
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-200'
                    : 'text-teal-700 hover:bg-teal-50'
                } ${!sidebarOpen && 'px-2 text-center'}`}
              >
                {sidebarOpen ? item.label : item.label.charAt(0)}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
