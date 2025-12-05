import { useState, useEffect } from 'react';
import { LogOut, RefreshCw, Thermometer, CreditCard, Settings } from 'lucide-react';
import { logout } from '../services/authService';
import { fetchAccessLogs, fetchTemperature } from '../services/apiService';
import { AccessLog, Temperature } from '../types';
import AccessLogsList from './AccessLogsList';
import TemperatureDisplay from './TemperatureDisplay';
import CardRegistration from './CardRegistration';
import ApiSettings from './ApiSettings';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [temperatures, setTemperatures] = useState<Temperature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'logs' | 'temp' | 'register' | 'settings'>('logs');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [logs, temps] = await Promise.all([
        fetchAccessLogs(),
        fetchTemperature()
      ]);
      setAccessLogs(logs);
      setTemperatures(temps);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Thermometer className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">스마트홈 관리 시스템</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                새로고침
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                  activeTab === 'logs'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                액세스 로그
              </button>
              <button
                onClick={() => setActiveTab('temp')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                  activeTab === 'temp'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Thermometer className="w-5 h-5" />
                온도 조회
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                  activeTab === 'register'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                카드 등록
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Settings className="w-5 h-5" />
                API 설정
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'logs' && <AccessLogsList logs={accessLogs} loading={loading} />}
            {activeTab === 'temp' && <TemperatureDisplay temperatures={temperatures} loading={loading} />}
            {activeTab === 'register' && <CardRegistration onSuccess={loadData} />}
            {activeTab === 'settings' && <ApiSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}
