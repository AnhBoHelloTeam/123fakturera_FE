import { useState } from 'react';

     function HamburgerMenu() {
       const [isOpen, setIsOpen] = useState(false);

       const toggleMenu = () => {
         setIsOpen(!isOpen);
       };

       return (
         <div className="hamburger-menu">
           <button className="hamburger-button" onClick={toggleMenu}>
             <span></span>
             <span></span>
             <span></span>
           </button>
           <nav className={`menu ${isOpen ? 'open' : ''}`}>
             <ul>
               <li><a href="/">Home</a></li>
               <li><a href="/Order">Order</a></li>
               <li><a href="Our-Customers">Our Customers</a></li>
               <li><a href="About-us">About us</a></li>
               <li><a href="Contact-Us">Contact Us</a></li>
             </ul>
           </nav>
         </div>
       );
     }

     export default HamburgerMenu;