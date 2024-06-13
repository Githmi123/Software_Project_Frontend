import React from "react";
import "../Footer/Footer.css";

const Footer = () => {
  return (
    <div id="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We are a team dedicated to providing the best service possible.</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: apgs@gmail.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon">
              FB
            </a>
            <a href="#" className="social-icon">
              TW
            </a>
            <a href="#" className="social-icon">
              IN
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
