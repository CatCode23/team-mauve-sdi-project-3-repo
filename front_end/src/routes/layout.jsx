import { Outlet, Link } from 'react-router-dom';
import '../components/App.css';

const Layout = () => {
  return (
    <div className="app-container">
    <div className="app-header">
      <h1>Fitness Hub</h1>
      <nav className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/workouts">Workouts</Link>
        <Link to="/set-goal">Set Goal</Link>
        <Link to="/user-profile">Profile</Link>
        <Link to="/leader-dashboard">Dashboard</Link>
        <Link to="/">Logout</Link>
      </nav>
    </div>
    <div className="content">
      <Outlet />
    </div>
  </div>
  );
};

export default Layout;