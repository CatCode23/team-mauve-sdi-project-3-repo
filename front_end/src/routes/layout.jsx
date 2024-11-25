import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <div className="header">
        Nav-Bar Placeholder
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;