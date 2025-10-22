import React from 'react';


export default function ConfirmModal({ message, onConfirm, onCancel }) {
return (
<div className="confirm-overlay">
<div className="confirm-box">
<p>{message}</p>
<div className="actions">
<button className="btn-primary" onClick={onConfirm}>Yes</button>
<button className="btn-secondary" onClick={onCancel}>No</button>
</div>
</div>
</div>
);
}