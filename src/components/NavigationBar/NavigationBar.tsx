import { useTimeOClock } from "../../hooks/useTimeOClock";
import { UIBattery } from "../UI-Kit/UIBattary/UIBattary";
import CellularIcon from "../../assets/connection.svg";
import WifiIcon from "../../assets/WIFI.svg";
import "./NavigationBar.css";

interface NavigationBarProps {
  networkStrength?: 1 | 2 | 3 | 4;
  wifiStrength?: 1 | 2 | 3 | 4;
  isOnline?: boolean;
}

export const NavigationBar = ({
  networkStrength = 4,
  wifiStrength = 4,
  isOnline = true,
}: NavigationBarProps) => {
  const moscowTime = useTimeOClock();

  return (
    // <div className="container">
      <header className="status-bar">
        <div className="status-bar__container">
          <time
            className="status-bar__time"
            dateTime={new Date().toISOString()}
          >
            {moscowTime}
          </time>
          <ul className="status-bar__indicators">
            <li className="status-bar__indicator">
              <img
                src={CellularIcon}
                alt={`Уровень сотовой связи: ${networkStrength} из 4`}
                className={`status-bar__network-icon ${
                  !isOnline ? "status-bar__network-icon--offline" : ""
                }`}
              />
            </li>
            <li className="status-bar__indicator">
              <img
                src={WifiIcon}
                alt={`Уровень WiFi сигнала: ${wifiStrength} из 4`}
                className={`status-bar__wifi-icon ${
                  !isOnline ? "status-bar__wifi-icon--offline" : ""
                }`}
              />
            </li>
            <li className="status-bar__indicator">
              <UIBattery />
            </li>
          </ul>
        </div>
      </header>
    // </div>
  );
};
