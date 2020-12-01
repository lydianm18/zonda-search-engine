import React, { Component } from "react";
import styled from "styled-components";
import FiltersSidebar from "./FiltersSidebar/FiltersSidebar";

import { SideBar } from "searchkit";

class Sidebar extends Component {
  state = { showing: true };
  render() {
    const { showing } = this.state;
    return (
      <SideBar className="sidebar">
        <button onClick={() => this.setState({ showing: !showing })}>
          hide
        </button>
        <img
          className="logo"
          style={{ height: showing ? "" : "20px" }}
          src="lh_logo.png"
          widht="30"
          height="60"
        ></img>
        <FiltersSidebar showing={this.state.showing}></FiltersSidebar>
      </SideBar>
    );
  }
}

export default Sidebar;
