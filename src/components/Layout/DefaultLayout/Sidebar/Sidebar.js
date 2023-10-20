import config from "../../../../config";
import Menu, { MenuItem } from "./Menu";
import styles from "./SideBar.css";
import { MdDashboard } from "react-icons/md";
function SideBar() {
  return (
    <aside>
      <Menu>
        <MenuItem
          title="GateWay"
          to={config.routes.gateway}
          icon={<MdDashboard />}
        />
        <MenuItem
          title="ModbusRTU"
          to={config.routes.modbusrtu}
          icon={<MdDashboard />}
        />
      </Menu>
    </aside>
  );
}

export default SideBar;
