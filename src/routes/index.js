import GateWay from "../pages/GateWay";
import ModbusRTU from "../pages/ModbusRTU";
const publicRoutes = [
  {
    path: "/",
    component: GateWay,
  },
  {
    path: "/modbusrtu",
    component: ModbusRTU,
  },
];

export { publicRoutes };
