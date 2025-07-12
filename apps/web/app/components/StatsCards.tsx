import { FaRegCircleCheck } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { HiArrowTrendingUp } from "react-icons/hi2";

interface StatsCardsProps {
  totalOrders: number;
  totalRevenue: number;
  pendingOrdersCount: number;
  avgOrderValue: number;
}

export function StatsCards({
  totalOrders,
  totalRevenue,
  pendingOrdersCount,
  avgOrderValue
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <FaRegCircleCheck color={'#22c55e'} size={20} />
          </div>

          <div>
            <span className="text-sm text-gray-600">Total Orders</span>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaDollarSign color="#2563eb" />
          </div>
          <div>
            <span className="text-sm text-gray-600">Today's Revenue</span>
            <p className="text-2xl font-bold text-gray-900">£{totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <BiTime color="#ca8a04" size={20} />

          </div>
          <div>
            <span className="text-sm text-gray-600">Pending Orders</span>
            <p className="text-2xl font-bold text-gray-900">{pendingOrdersCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <HiArrowTrendingUp size={20} color="#9333ea" />
          </div>
          <div>
            <span className="text-sm text-gray-600">Avg Order Value</span>
            <p className="text-2xl font-bold text-gray-900">£{avgOrderValue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
