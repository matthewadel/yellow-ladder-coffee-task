"use client"
import { OrdersTable, StatsCards, } from './components';
import { useOrders } from './hooks';
import { ErrorAlert, LoadingState } from './ui';

export default function Home() {
  const {
    orders,
    loading,
    error,
    updateOrderStatus,
  } = useOrders();

  return (
    <LoadingState
      loading={loading}
      error={error}
      hasData={orders.length > 0}
      loadingMessage="Loading orders..."
    >
      <div className="h-full flex flex-col p-6">
        {error && (
          <ErrorAlert
            error={`API connection issue: ${error}. Please try refreshing.`}
            variant="warning"
            className="mb-6 flex-shrink-0"
          />
        )}

        <StatsCards orders={orders} />
        <OrdersTable
          orders={orders}
          onUpdateOrderStatus={updateOrderStatus}
          isLoading={loading}
        />

      </div>
    </LoadingState>
  );
}
