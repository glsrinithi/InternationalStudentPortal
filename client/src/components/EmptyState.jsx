export default function EmptyState({ title, message, icon = '📭', action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title || 'Nothing here yet'}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}