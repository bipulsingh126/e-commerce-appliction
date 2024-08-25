import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" href="#">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link" href="#">
                  Link
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                to="/"
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/" className="dropdown-item" href="#">
                      Action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="dropdown-item" href="#">
                      Another action
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink to="/" className="dropdown-item" href="#">
                      Something else here
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link disabled" aria-disabled="true">
                  Disabled
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
