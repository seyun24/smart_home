import { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';
import { getApiUrl, setApiUrl } from '../services/apiService';

export default function ApiSettings() {
  const [apiUrl, setApiUrlInput] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setApiUrlInput(getApiUrl());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiUrl(apiUrl.trim());
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-slate-700 p-3 rounded-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">API 설정</h2>
        </div>
        <p className="text-gray-600">
          API 서버 주소를 변경할 수 있습니다. 변경 후 저장 버튼을 클릭하세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="apiUrl" className="block text-sm font-medium text-gray-700 mb-2">
            API 서버 URL
          </label>
          <input
            id="apiUrl"
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrlInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition font-mono"
            placeholder="http://localhost:3000"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            API 서버의 기본 주소를 입력하세요 (예: http://localhost:3000)
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">API 엔드포인트</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">GET</span>
              <span className="font-mono">/home/log</span>
              <span className="text-blue-600">- 액세스 로그 조회</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">GET</span>
              <span className="font-mono">/home/temp</span>
              <span className="text-blue-600">- 온도 조회</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">POST</span>
              <span className="font-mono">/home/card</span>
              <span className="text-blue-600">- 카드 등록</span>
            </li>
          </ul>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">API URL이 성공적으로 저장되었습니다!</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          저장
        </button>
      </form>
    </div>
  );
}
