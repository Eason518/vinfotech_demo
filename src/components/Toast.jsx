import { useState, useEffect, useCallback } from 'react';

let _addToast = null;

export function toast(message, type = 'success') {
  if (_addToast) _addToast(message, type);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((message, type) => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  useEffect(() => { _addToast = add; return () => { _addToast = null; }; }, [add]);

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const colors = { success: '#28a745', error: '#dc3545', warning: '#ffc107', info: '#3a7bd5' };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: '#fff', borderLeft: `4px solid ${colors[t.type]}`,
          borderRadius: '8px', padding: '12px 16px', minWidth: '260px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'slideIn 0.2s ease', fontSize: '13px', fontWeight: 500,
        }}>
          <span>{icons[t.type]}</span>
          <span>{t.message}</span>
        </div>
      ))}
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}
