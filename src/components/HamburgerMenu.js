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
               <li><a href="#">Home</a></li>
               <li><a href="#">About</a></li>
               <li><a href="#">Services</a></li>
               <li><a href="#">Contact</a></li>
             </ul>
           </nav>
         </div>
       );
     }

     export default HamburgerMenu;