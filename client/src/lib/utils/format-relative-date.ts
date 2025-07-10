export function formatDate(date: Date): string {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  };

  const isSameWeek = (d1: Date, d2: Date): boolean => {
    const getWeek = (d: Date): number => {
      const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const firstDay = new Date(target.getFullYear(), 0, 1);
      const dayDiff = Math.floor((target.getTime() - firstDay.getTime()) / 86400000);
      return Math.ceil((dayDiff + firstDay.getDay() + 1) / 7);
    };

    return d1.getFullYear() === d2.getFullYear() && getWeek(d1) === getWeek(d2);
  };

  if (isSameWeek(date, now)) {
    const formatter = new Intl.DateTimeFormat("pt-BR", options);
    const formatted = formatter.format(date);

    // Capitalize and optionally remove "-feira"
    const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    return capitalized.replace("-feira", "");
  }

  // Relative time logic
  const diffMs = now.getTime() - date.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks >= 1) return `Há ${weeks} semana${weeks > 1 ? "s" : ""} atrás`;
  if (days >= 1) return `Há ${days} dia${days > 1 ? "s" : ""} atrás`;
  if (hours >= 1) return `Há ${hours} hora${hours > 1 ? "s" : ""} atrás`;
  if (minutes >= 1) return `Há ${minutes} minuto${minutes > 1 ? "s" : ""} atrás`;

  return "Há poucos segundos";
}
