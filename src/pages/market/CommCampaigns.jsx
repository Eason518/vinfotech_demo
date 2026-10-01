import { useNavigate } from 'react-router-dom';
import { campaigns } from '../../data/marketMockData';

export default function CommCampaigns() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="market-page-header">
        <div className="market-page-title">Campaigns</div>
        <button className="btn-orange" onClick={() => navigate('/market/communication/new-broadcast')}>
          New Broadcast
        </button>
      </div>

      <div className="market-card" style={{ padding: 0 }}>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>Campaigns</th><th>Type</th><th>Channels</th><th>Audience</th><th>Sent</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#9ca3af', padding: '28px 0' }}>No campaigns found.</td>
                </tr>
              ) : campaigns.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td>{c.type}</td>
                  <td>{c.channels}</td>
                  <td>{c.audience}</td>
                  <td>{c.sent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
