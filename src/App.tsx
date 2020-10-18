import React from "react";
import Content from "./Components/Content/Content";
import { BrowserRouter } from "react-router-dom"
import HeaderContainer from "./Components/Header/HeaderContainer";

export default function App() {
  return (
      <BrowserRouter>
        <HeaderContainer />
        <Content />
      </BrowserRouter>
  );
}
