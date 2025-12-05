import { useState } from 'react';
import { CreditCard, UserPlus, CheckCircle } from 'lucide-react';
import { registerCard } from '../services/apiService';

interface CardRegistrationProps {
  onSuccess: () => void;
}

export default function CardRegistration({ onSuccess }: CardRegistrationProps) {
  const [cardUid, setCardUid] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await registerCard({
        card_uid: cardUid,
        owner_name: ownerName
      });
      setSuccess(true);
      setCardUid('');
      setOwnerName('');
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '카드 등록에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-600 p-3 rounded-lg">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">새 카드 등록</h2>
        </div>
        <p className="text-gray-600">
          새로운 액세스 카드를 시스템에 등록합니다. 카드 UID와 소유자 이름을 입력하세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cardUid" className="block text-sm font-medium text-gray-700 mb-2">
            카드 UID
          </label>
          <input
            id="cardUid"
            type="text"
            value={cardUid}
            onChange={(e) => setCardUid(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition font-mono"
            placeholder="EA 68 D5 05"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            카드의 고유 식별자를 입력하세요 (예: EA 68 D5 05)
          </p>
        </div>

        <div>
          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-2">
            소유자 이름
          </label>
          <input
            id="ownerName"
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="홍길동"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            카드 소유자의 이름을 입력하세요
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">카드가 성공적으로 등록되었습니다!</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              등록 중...
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              카드 등록
            </>
          )}
        </button>
      </form>
    </div>
  );
}
