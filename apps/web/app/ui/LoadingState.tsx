import React from 'react';

interface LoadingStateProps {
  loading: boolean;
  error?: string | null;
  hasData: boolean;
  children: React.ReactNode;
  loadingMessage?: string;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  className?: string;
}

export const LoadingState = ({
  loading,
  error,
  hasData,
  children,
  loadingMessage = "Loading...",
  errorComponent,
  emptyComponent,
  className = "p-6"
}: LoadingStateProps) => {
  if (loading && !hasData) {
    return (
      <div className={className}>
        <div className={`flex items-center justify-center min-h-[400px]`}>
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4`}></div>
            {loadingMessage && <p className="text-gray-600">{loadingMessage}</p>}
          </div>
        </div>

      </div>
    );
  }

  if (error && !hasData) {
    if (errorComponent) {
      return <>{errorComponent}</>;
    }

    return (
      <div className={className}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!hasData && !loading) {
    if (emptyComponent) {
      return <>{emptyComponent}</>;
    }

    return (
      <div className={className}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Found</h3>
            <p className="text-gray-600">There are no orders to display.</p>
          </div>
        </div>
      </div>
    );
  }

  return <div className="h-full">{children}</div>;
};
