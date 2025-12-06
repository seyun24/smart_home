import { Thermometer, Clock } from 'lucide-react';
import { Temperature } from '../types';

interface TemperatureDisplayProps {
  temperatures: Temperature[];
  loading: boolean;
}

export default function TemperatureDisplay({ temperatures, loading }: TemperatureDisplayProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (temperatures.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        온도 데이터가 없습니다
      </div>
    );
  }

  const latestTemp = temperatures[0];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium opacity-90">현재 온도</h3>
          <Thermometer className="w-8 h-8 opacity-90" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold">{latestTemp.temperature}</span>
          <span className="text-3xl font-medium opacity-90">°C</span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
          <Clock className="w-4 h-4" />
          {new Date(latestTemp.created_at).toLocaleString('ko-KR')}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">온도 기록</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  장치 ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  온도
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  측정 시간
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {temperatures.map((temp) => (
                <tr key={temp.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {temp.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {temp.device_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                    {temp.temperature}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                        {new Date(temp.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
