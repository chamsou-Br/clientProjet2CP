import React from 'react'
import {ArrowUp} from "react-bootstrap-icons"
import $ from 'jquery'



export default function ScrollTopButton() {
    // scroll Top button display
window.onscroll = function(){ 
    if (window.scrollY >= 10) {
        if (!document.querySelector('.scrollTop').classList.contains('active')) {
            document.querySelector('.scrollTop').classList.add('active');
        }
    }else {
        if (document.querySelector('.scrollTop').classList.contains('active')) {
            document.querySelector('.scrollTop').classList.remove('active');
        }
    }
 }

 // scroll top function
const NavAnimation = ( e) => {
    e.preventDefault()  
        $("html, body").animate({
    
            scrollTop: 0

        },1000);
  }
    return (
        <div className='scrollTop ' onClick={(e) => NavAnimation(e)}>
                <ArrowUp  className='icon  ' color='white' size={20} />
        </div>
    )
}
