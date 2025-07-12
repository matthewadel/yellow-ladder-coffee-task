"use client"
import { OrdersTable, StatsCards, LoadingState, ErrorAlert } from './components';
import { useOrders } from './hooks';

export default function Home() {
  const { 
    orders, 
    loading, 
    error, 
    refreshOrders, 
    updateOrderStatus,  
  } = useOrders();

  return (
    <LoadingState
      loading={loading}
      error={error}
      hasData={orders.length > 0}
      loadingMessage="Loading orders..."
    >
      <div className="p-6">
        {error && (
          <ErrorAlert
            error={`API connection issue: ${error}. Please try refreshing.`}
            variant="warning"
            className="mb-6"
          />
        )}
        
        <StatsCards orders={orders} />
        <OrdersTable
          orders={orders}
          onUpdateOrderStatus={updateOrderStatus}
          onRefresh={refreshOrders}
          isLoading={loading}
        />
      </div>
    </LoadingState>
  );
}
