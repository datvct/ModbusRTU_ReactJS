import SideBar from "./Sidebar/Sidebar";
import styles from "./DefaultLayout.css";
function DefaultLayout({ children }) {
  return (
    <div>
      <div className="container">
        <SideBar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
