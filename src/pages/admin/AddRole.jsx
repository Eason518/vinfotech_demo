import { useState } from 'react';
import Layout from '../../components/Layout';
import { toast } from '../../components/Toast';

const adminRoles = ['Super Admin', 'Content Manager', 'Finance Manager', 'Support Agent'];

export default function AddRole() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    wrongAttemptBlock: 'No',
    otpMandate: 'No',
    userProfileViewOnly: 'No',
    adminRole: '',
  });

  const isValid = form.firstName && form.lastName && form.email && form.password && form.adminRole;

  const handleSave = () => {
    if (!isValid) return;
    toast('Admin user created successfully', 'success');
    setForm({ firstName: '', lastName: '', email: '', password: '', wrongAttemptBlock: 'No', otpMandate: 'No', userProfileViewOnly: 'No', adminRole: '' });
  };

  return (
    <Layout title="Add User Role">
      <div className="page-header">
        <p className="breadcrumb">Home / Admin Role Management / <span>Add Role</span></p>
        <h1>Add User Role</h1>
      </div>
      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">First Name <span style={{ color: 'var(--danger)' }}>*</span></label>
            <input className="form-control" placeholder="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name <span style={{ color: 'var(--danger)' }}>*</span></label>
            <input className="form-control" placeholder="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email <span style={{ color: 'var(--danger)' }}>*</span></label>
          <input className="form-control" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Password <span style={{ color: 'var(--danger)' }}>*</span></label>
          <input className="form-control" type="password" placeholder="*******" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Wrong attempt block -</label>
          <div className="flex gap-4" style={{ alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
              <input type="radio" name="wrongAttemptBlock" value="Yes" checked={form.wrongAttemptBlock === 'Yes'} onChange={() => setForm({ ...form, wrongAttemptBlock: 'Yes' })} />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
              <input type="radio" name="wrongAttemptBlock" value="No" checked={form.wrongAttemptBlock === 'No'} onChange={() => setForm({ ...form, wrongAttemptBlock: 'No' })} />
              No {form.wrongAttemptBlock === 'No' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)', display: 'inline-block', marginLeft: 2 }}></span>}
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">OTP Mandate -</label>
          <div className="flex gap-4" style={{ alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
              <input type="radio" name="otpMandate" value="Yes" checked={form.otpMandate === 'Yes'} onChange={() => setForm({ ...form, otpMandate: 'Yes' })} />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
              <input type="radio" name="otpMandate" value="No" checked={form.otpMandate === 'No'} onChange={() => setForm({ ...form, otpMandate: 'No' })} />
              No {form.otpMandate === 'No' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)', display: 'inline-block', marginLeft: 2 }}></span>}
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">User Profile View Only -</label>
          <div className="flex gap-4" style={{ alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
              <input type="radio" name="userProfileViewOnly" value="Yes" checked={form.userProfileViewOnly === 'Yes'} onChange={() => setForm({ ...form, userProfileViewOnly: 'Yes' })} />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
              <input type="radio" name="userProfileViewOnly" value="No" checked={form.userProfileViewOnly === 'No'} onChange={() => setForm({ ...form, userProfileViewOnly: 'No' })} />
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Admin Role <span style={{ color: 'var(--danger)' }}>*</span></label>
          <select className="form-control" value={form.adminRole} onChange={e => setForm({ ...form, adminRole: e.target.value })}>
            <option value="">Select from existing roles</option>
            {adminRoles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            className="btn"
            style={{ background: isValid ? 'var(--primary)' : '#aaa', color: '#fff', cursor: isValid ? 'pointer' : 'not-allowed' }}
            onClick={handleSave}
            disabled={!isValid}
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
}
