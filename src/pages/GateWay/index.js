import { TfiReload } from "react-icons/tfi";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from "./style.css";
function GateWay() {
  return (
    <div className="gateWay">
      <h2>GateWay</h2>
      <div className="item-car">
        <input type="text" name="severhost" className="severhost" required />
        <label for="">Sever host</label>
      </div>
      <div className="item-car">
        <input type="number" name="severport" className="severport" required />
        <label for="">Sever port</label>
      </div>
      <div className="item-car">
        <input
          type="text"
          name="accesstoken"
          className="accesstoken"
          required
        />
        <label for="">Access Token</label>
      </div>
      <div className="button-gateway">
        <button type="button" className="reload">
          <TfiReload />
          RELOAD
        </button>
        <button type="button" className="apply">
          <FaLongArrowAltRight />
          APPLY
        </button>
      </div>
    </div>
  );
}

export default GateWay;
