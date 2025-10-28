import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const checked = currentTemperatureUnit === "C";

  return (
    <label className="temp-toggle">
      <input
        type="checkbox"
        className="temp-toggle__checkbox"
        checked={checked}
        onChange={handleToggleSwitchChange}
      />

      <span className="temp-toggle__track">
        <span className="temp-toggle__label temp-toggle__label--f">F</span>
        <span className="temp-toggle__label temp-toggle__label--c">C</span>
        <span className="temp-toggle__knob"></span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
