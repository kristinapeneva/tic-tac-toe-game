import React from "react";
import { EmailShareButton, FacebookShareButton, FacebookMessengerShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, EmailIcon, WhatsappIcon, TwitterIcon, FacebookMessengerIcon } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faFacebookMessenger, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Popup = props => {
    return (
        <div className="popup-box">
            <span className="close-popup" onClick={props.handleClose}>X</span>
            <div className="box">                
                <div className="social-icons">
                    <FacebookShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                        {props.theme === "theme1" ? <FacebookIcon size="1.5rem" round={true} className="icon icon-fb" quote="Check this awesome Tic-Tac-Toe game! I just love it <3" /> : <FontAwesomeIcon icon={faFacebook} className="icon icon-fb" />}
                    </ FacebookShareButton>
                    <FacebookMessengerShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                        {props.theme === "theme1" ? <FacebookMessengerIcon size="1.5rem" round={true} className="icon icon-msg" quote="Check this awesome Tic-Tac-Toe game! I just love it <3" /> : <FontAwesomeIcon icon={faFacebookMessenger} className="icon icon-msg" />}
                    </ FacebookMessengerShareButton>
                    <WhatsappShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                    {props.theme === "theme1" ? <WhatsappIcon size="1.5rem" round={true} className="icon icon-wa" /> : <FontAwesomeIcon icon={faWhatsapp} className="icon icon-wa" />}
                    </ WhatsappShareButton>
                    <EmailShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                        {props.theme === "theme1" ? <EmailIcon size="1.5rem" round={true} className="icon icon-eml" subject="A New Tic-Tac-Toe Game! Check it!"/> : <FontAwesomeIcon icon={faEnvelope} className="icon icon-eml" />}
                    </ EmailShareButton>
                    <TwitterShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                    {props.theme === "theme1" ? <TwitterIcon size="1.5rem" round={true} className="icon icon-tw" title="Tic-Tac-Toe Game" /> : <FontAwesomeIcon icon={faTwitter} className="icon icon-tw" />}
                    </ TwitterShareButton>
                </div>
            </div>
        </div>
    )
}

export default Popup;