import { useState } from "react";
import { useLocation } from "wouter";
import AdminSidebar from "@/components/admin/AdminSidebar";
import OrderList from "@/components/admin/OrderList";
import CreateOrderForm from "@/components/admin/CreateOrderForm";

export default function Orders() {
  const [, setLocation] = useLocation();
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("lbc_admin");
    setLocation("/admin");
  };

  // Handler for creating a new order
  const handleCreateOrder = () => {
    setSelectedOrder(null);
    setIsCreateOrderOpen(true);
  };

  // Handler for editing an existing order
  const handleEditOrder = (order: any) => {
    setSelectedOrder(order);
    setIsCreateOrderOpen(true);
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
              <h1 className="text-2xl font-semibold text-gray-900">Order Management</h1>
              <p className="text-sm text-gray-500">View and manage all shipping orders</p>
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

        {/* Orders Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <OrderList 
            onCreateOrder={handleCreateOrder}
            onEditOrder={handleEditOrder}
          />
        </main>
      </div>

      {/* Create/Edit Order Modal */}
      <CreateOrderForm
        open={isCreateOrderOpen}
        onClose={() => setIsCreateOrderOpen(false)}
        initialData={selectedOrder}
      />
    </div>
  );
}
