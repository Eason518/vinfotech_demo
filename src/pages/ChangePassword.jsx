import { useState } from 'react';
import Layout from '../components/Layout';
import { toast } from '../components/Toast';

export default function ChangePassword() {
  const [form, setForm] = useState({ old: '', newPass: '', confirm: '' });

  const isValid = form.old && form.newPass && form.confirm;

  const handleSubmit = () => {
    if (!isValid) return;
    if (form.newPass !== form.confirm) {
      toast('New password and confirm password do not match', 'error');
      return;
    }
    toast('Password updated successfully', 'success');
    setForm({ old: '', newPass: '', confirm: '' });
  };

  return (
    <Layout title="Change Password">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '40px' }}>
        <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
          <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: '24px', marginBottom: '32px' }}>Change Password</h2>
          <div className="form-group">
            <label className="form-label">
              Old Password <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="password"
              className="form-control"
              style={{ background: '#f5f6fa' }}
              placeholder="Old Password"
              value={form.old}
              onChange={e => setForm({ ...form, old: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              New Password <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="password"
              className="form-control"
              style={{ background: '#f5f6fa' }}
              placeholder="New Password"
              value={form.newPass}
              onChange={e => setForm({ ...form, newPass: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              Confirm Password <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="password"
              className="form-control"
              style={{ background: '#f5f6fa' }}
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={e => setForm({ ...form, confirm: e.target.value })}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              className="btn"
              style={{ background: isValid ? '#6c757d' : '#aaa', color: '#fff', padding: '10px 40px', cursor: isValid ? 'pointer' : 'not-allowed', borderRadius: '6px' }}
              onClick={handleSubmit}
              disabled={!isValid}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
