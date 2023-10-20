import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./menu.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function MenuItem({ title, to, icon }) {
  return (
    <NavLink
      className={(nav) => cx("menu-item", { active: nav.isActive })}
      to={to}
    >
      <p className={cx("icon")}>{icon}</p>
      <p className={cx("title")}>{title}</p>
    </NavLink>
  );
}
MenuItem.protoTypes = {
  title: PropTypes.node.isRequired,
  to: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
};

export default MenuItem;
