export default function Loader({ label = 'Loading...', fullScreen = false }) {
  return (
    <div className={`loader-wrap ${fullScreen ? 'loader-full' : ''}`}>
      <div className="loader-spinner" aria-hidden="true"></div>
      <p className="loader-label">{label}</p>
    </div>
  );
}