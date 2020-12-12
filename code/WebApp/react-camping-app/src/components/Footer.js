import React from "react";

import icon from "../assets/ikona.png";

const Footer = () => (
  <footer className="bg-light p-3 text-center">
    <img className="mb-3 app-logo" src={icon} alt="Camping logo" width="50" />
    <p>&copy; FERI 2020 by EKIPA KAMPERI</p>
  </footer>
);

export default Footer;
