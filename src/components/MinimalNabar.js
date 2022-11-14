import React from "react";
import {Outlet} from "react-router-dom";

const MinimalNabar = () => {
    return(
    <>
        <div className="ui menu">
        <div className="header item">Brand</div>
        <a className="active item">Link</a>
        <a className="item">Link</a>
        <div className="ui dropdown item" tabIndex="0">
            Dropdown
            <i className="dropdown icon"></i>
            <div className="menu" tabIndex="-1">
                <div className="item">Action</div>
                <div className="item">Another Action</div>
                <div className="item">Something else here</div>
                <div className="divider"></div>
                <div className="item">Separated Link</div>
                <div className="divider"></div>
                <div className="item">One more separated link</div>
            </div>
        </div>
        <div className="right menu">
            <div className="item">
                <div className="ui action left icon input">
                    <i className="search icon"></i>
                    <input type="text" placeholder="Search"/>
                    <button className="ui button">Submit</button>
                </div>
            </div>
            <a className="item">Link</a>
        </div>
    </div>
        <Outlet/>
    </>);
}

export default MinimalNabar;