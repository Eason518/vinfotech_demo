import { useState } from 'react';
import Layout from '../../components/Layout';
import { toast } from '../../components/Toast';

const initialAdmins = [
  { id: 1, firstName: 'vadmin', lastName: 'Admin', email: 'vadmin@vinfotech.com', twoFA: 'No', adminBlock: 'No', role: 'Super Admin' },
  { id: 2, firstName: 'content', lastName: 'Manager', email: 'content@cricjam.com', twoFA: 'No', adminBlock: 'No', role: 'Content Manager' },
  { id: 3, firstName: 'finance', lastName: 'Manager', email: 'finance@cricjam.com', twoFA: 'No', adminBlock: 'No', role: 'Finance Manager' },
];

export default function ManageRoles() {
  const [data, setData] = useState(initialAdmins);

  const handleDelete = (id) => {
    setData(d => d.filter(r => r.id !== id));
    toast('Admin user deleted', 'error');
  };

  return (
    <Layout title="Admin Role">
      <div className="page-header">
        <p className="breadcrumb">Home / Admin Role Management / <span>Manage Roles</span></p>
        <h1>Admin Role</h1>
      </div>
      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>2FA</th>
                <th>Admin Block</th>
                <th>Roles</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.firstName}</strong></td>
                  <td>{r.lastName}</td>
                  <td style={{ fontSize: '13px' }}>{r.email}</td>
                  <td>{r.twoFA}</td>
                  <td>{r.adminBlock}</td>
                  <td><span className="badge badge-secondary">{r.role}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline">Edit</button>
                      <button className="btn btn-xs btn-danger" onClick={() => handleDelete(r.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No admin users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
