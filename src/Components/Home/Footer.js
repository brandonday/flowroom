import React, { Component } from 'react';
import '../styles/stylesheet.css';
import Logo from './Logo.js';

const Footer = () => (
    <div className="footer">
        <div className="content-container">
            <div className="footer-content">
                <Logo/>
                <div className="footer-links">
                    <div className="footer-links-left">
                        <p className="footer-link">About</p>
                        <p className="footer-link">Privacy</p>
                        <p className="footer-link">Policy</p>
                    </div>
                    <div className="footer-links-right">
                        <p className="footer-link">About</p>
                        <p className="footer-link">Terms of Use</p>
                        <p className="footer-link">Contact Us</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Footer;