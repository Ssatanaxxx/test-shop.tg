import { useEffect, useState } from "react";

interface UseTimeOClockOptions {
  timeZone?: string;
  showSeconds?: boolean;
}

export const useTimeOClock = (options: UseTimeOClockOptions = {}) => {
  const { timeZone = "Europe/Moscow", showSeconds = false } = options;
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatOptions: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: showSeconds ? "2-digit" : undefined,
        hour12: false,
      };
      const currentTime = new Date().toLocaleTimeString("ru-RU", formatOptions);
      setTime(currentTime);
    };

    updateTime();
    const intervalMs = showSeconds ? 1000 : 60000;
    const intervalId = setInterval(updateTime, intervalMs);
    return () => clearInterval(intervalId);
  }, [timeZone, showSeconds]);

  return time;
};
