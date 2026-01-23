function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-white/70 backdrop-blur-sm border-b border-teal-100 px-6 py-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-teal-50 transition-colors duration-200 text-teal-600"
          >
            <span className="text-lg font-medium">{sidebarOpen ? '◀' : '▶'}</span>
          </button>
          <div>
            <h2 className="text-lg font-semibold text-teal-800">Xin chào!</h2>
            <p className="text-sm text-teal-600">Chào mừng bạn đến với hệ thống quản lý</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-teal-800">Admin</p>
            <p className="text-xs text-teal-500">Quản trị viên</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
