export function formatRelativeTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}m : ${secs}s`;
}
