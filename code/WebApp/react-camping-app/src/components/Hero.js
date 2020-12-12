import React from "react";

import icon from "../assets/ikona.png";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={icon} alt="React logo" width="120" />
    <h1 className="mb-4">Camping microservices</h1>

    <p className="lead">
      This is a sample application that demonstrates use of microservices and
      authentication flow with Auth0, using <strong>React.js</strong>
    </p>
  </div>
);

export default Hero;
