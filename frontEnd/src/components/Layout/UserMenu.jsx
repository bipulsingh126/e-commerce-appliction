import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <ul className="list-group">
          <h3 className="">Dashboard</h3>
          <NavLink to="/dashboard/user/profile" className="list-group-item">
            Profile
          </NavLink>
          <NavLink to="/dashboard/user/order" className="list-group-item">
            Order
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
