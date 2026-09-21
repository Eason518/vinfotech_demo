import { useState } from "react";
import Layout from "../../components/Layout";
import { toast } from "../../components/Toast";

export default function DepositWithdrawal() {
  const [settings, setSettings] = useState({
    minDeposit: 100, maxDeposit: 500,
    minWithdrawal: 100, maxWithdrawal: 500,
    manualPG: false,
  });
  const save = () => toast("Settings saved successfully", "success");
  return (
    <Layout title="Deposit and Withdrawal">
      <div className="page-header">
        <p className="breadcrumb">Home / Settings / <span>Deposit and Withdrawal</span></p>
        <h1>Deposit and Withdrawal</h1>
      </div>
      <div className="card" style={{maxWidth:"700px"}}>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Minimum Deposit Amount</label>
            <input type="number" className="form-control" value={settings.minDeposit} onChange={e=>setSettings({...settings,minDeposit:+e.target.value})} placeholder="100"/>
          </div>
          <div className="form-group">
            <label className="form-label">Maximum Deposit Amount</label>
            <input type="number" className="form-control" value={settings.maxDeposit} onChange={e=>setSettings({...settings,maxDeposit:+e.target.value})} placeholder="500"/>
          </div>
          <div className="form-group">
            <label className="form-label">Minimum Withdrawal Amount</label>
            <input type="number" className="form-control" value={settings.minWithdrawal} onChange={e=>setSettings({...settings,minWithdrawal:+e.target.value})} placeholder="100"/>
          </div>
          <div className="form-group">
            <label className="form-label">Maximum Withdrawal Amount</label>
            <input type="number" className="form-control" value={settings.maxWithdrawal} onChange={e=>setSettings({...settings,maxWithdrawal:+e.target.value})} placeholder="500"/>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Manual PG</label>
          <div className="flex items-center gap-3" style={{marginTop:"8px"}}>
            <label className="toggle">
              <input type="checkbox" checked={settings.manualPG} onChange={e=>setSettings({...settings,manualPG:e.target.checked})}/>
              <span className="toggle-slider"></span>
            </label>
            <span style={{fontSize:"13px",color:"var(--text-muted)"}}>{settings.manualPG ? "On" : "Off"}</span>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:"8px"}}>
          <button className="btn btn-outline btn-sm" onClick={save}>Save</button>
        </div>
      </div>
    </Layout>
  );
}
