import { useState } from 'react';

const initialTopics = [
  { id: 1, name: 'IPO', dbId: 'O32F869E01', position: 1 },
  { id: 2, name: 'Celebrities', dbId: 'O32F869E02', position: 2 },
  { id: 3, name: 'Sports', dbId: 'O32F869E03', position: 3 },
  { id: 4, name: 'BTC Price', dbId: 'O32F869E04', position: 4 },
  { id: 5, name: 'Altcoin', dbId: 'O32F869E05', position: 5 },
  { id: 6, name: 'Ethereum', dbId: 'O32F869E06', position: 6 },
];

export default function ReorderTopics() {
  const [items, setItems] = useState(initialTopics);
  const [dragIdx, setDragIdx] = useState(null);
  const [saved, setSaved] = useState(false);

  const onDragStart = (idx) => setDragIdx(idx);
  const onDragOver = (e, idx) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...items];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(idx, 0, moved);
    setItems(next.map((item, i) => ({ ...item, position: i + 1 })));
    setDragIdx(idx);
  };
  const onDragEnd = () => setDragIdx(null);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="market-page-header">
        <div>
          <div className="market-page-title">Reorder Topics</div>
          <div className="market-page-subtitle">Drag and drop to reorder enabled topics</div>
        </div>
        <button className="btn-outline" onClick={handleSave}>{saved ? 'Saved!' : 'Save Order'}</button>
      </div>

      <div className="reorder-list">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="reorder-item"
            draggable
            onDragStart={() => onDragStart(idx)}
            onDragOver={(e) => onDragOver(e, idx)}
            onDragEnd={onDragEnd}
            style={{ opacity: dragIdx === idx ? 0.5 : 1, background: dragIdx === idx ? '#fff8f5' : '#fff' }}
          >
            <div className="reorder-handle">&#9776;</div>
            <div className="reorder-thumb">{item.name.slice(0,3).toUpperCase()}</div>
            <div className="reorder-name">{item.name}</div>
            <div className="reorder-id">ID: {item.dbId}</div>
            <div className="reorder-position">#{item.position}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
