import React from "react";
import { EmailShareButton, FacebookShareButton, FacebookMessengerShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faFacebookMessenger, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Popup = props => {
    return (
        <div className="popup-box">
            <span className="close-popup" onClick={props.handleClose}>X</span>               
                <div className="social-icons">
                    <FacebookShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                        <FontAwesomeIcon icon={faFacebook} className="icon icon-fb" />
                    </ FacebookShareButton>
                    <FacebookMessengerShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                        <FontAwesomeIcon icon={faFacebookMessenger} className="icon icon-msg" />
                    </ FacebookMessengerShareButton>
                    <WhatsappShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                         <FontAwesomeIcon icon={faWhatsapp} className="icon icon-wa" />
                    </ WhatsappShareButton>
                    <EmailShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                        <FontAwesomeIcon icon={faEnvelope} className="icon icon-eml" />
                    </ EmailShareButton>
                    <TwitterShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
                        <FontAwesomeIcon icon={faTwitter} className="icon icon-tw" />
                    </ TwitterShareButton>
                </div>
        </div>
    )
}

export default Popup;