import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div id="header" className="container-fluid header-top d-none d-md-block pb-5 pt-5">

        </div>
        <div className="container-fluid bg-black">
            <nav id="navbar-main" className={`container navbar navbar-expand-lg bg-black text-white `}
                    style={{ fontSize: "18px" }}>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ">
                        <li className="nav-item">
                            <Link to={"/student/home"}><span className="nav-link pl-5 pr-5">HOME</span></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">

                    </ul>
                </div>
            </nav>
        </div>
    </div>
  )
}

export default Navbar