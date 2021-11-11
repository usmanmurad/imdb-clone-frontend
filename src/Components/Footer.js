import {AiFillFacebook, AiOutlineInstagram, IoLogoTwitch, AiOutlineTwitter, AiFillYoutube} from "react-icons/all";
import '../styles/Footer.css';

function Footer() {
    return (
        <div className='footer'>
            <AiFillFacebook className='footer_icon' />
            <AiOutlineInstagram className='footer_icon' />
            <IoLogoTwitch className='footer_icon' />
            <AiOutlineTwitter className='footer_icon' />
            <AiFillYoutube className='footer_icon' />
        </div>
    )
}

export default Footer;