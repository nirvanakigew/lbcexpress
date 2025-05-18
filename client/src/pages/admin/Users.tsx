import { useLocation } from "wouter";
import AdminSidebar from "@/components/admin/AdminSidebar";
import UserManagement from "@/components/admin/UserManagement";

export default function Users() {
  const [, setLocation] = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("lbc_admin");
    setLocation("/admin");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <AdminSidebar onLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Admin User Management</h1>
              <p className="text-sm text-gray-500">Create and manage admin user accounts</p>
            </div>
            <div className="md:hidden">
              <button
                onClick={handleLogout}
                className="ml-2 bg-gray-200 px-3 py-1 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* User Management Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <UserManagement />
        </main>
      </div>
    </div>
  );
}
