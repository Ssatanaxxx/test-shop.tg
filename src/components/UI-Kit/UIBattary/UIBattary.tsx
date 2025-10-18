import { useEffect, useState } from "react";
import "./UIBattary.css";

export const UIBattery = () => {
  const [charge, setCharge] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setCharge((prev: number) => Math.max(0, prev - 1));
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="battery-wrapper">
      <div className="battery-container">
        <div className="battery-body">
          <div className="battery-level" style={{ width: `${charge}%` }}>
            <span className="battery-percent">{charge}</span>
          </div>
        </div>
        <div className="battery-contact" />
      </div>
    </div>
  );
};
