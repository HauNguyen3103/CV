import React from 'react';
import './FooterComponent.css';

const FooterComponent = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-payment">
                    <h3>Payment Methods</h3>
                    <div className="payment-methods">
                        <img src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png" alt="Visa" className="icons-img"/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/640px-Mastercard-logo.svg.png" alt="Mastercard" className="icons-img"/>
                        <img src="https://lzd-img-global.slatic.net/g/tps/tfs/TB10rN4lnM11u4jSZPxXXahcXXa-1024-1024.png" alt="Zalo" className="icons-img"/>
                        <img src="https://lzd-img-global.slatic.net/g/tps/tfs/O1CN0174CwSq2NjastWFX1u_!!19999999999999-2-tps.png" alt="Momo" className="icons-img"/>
                    </div>
                </div>
                <div className="footer-social">
                    <h3>Follow us on</h3>
                    <div className="social-icons">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1200px-Facebook_f_logo_%282021%29.svg.png" alt="Facebook" className="social-logos"/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png" alt="LinkedIN" className="social-logos"/>
                        <img src="https://static.vecteezy.com/system/resources/previews/018/930/572/original/youtube-logo-youtube-icon-transparent-free-png.png" alt="YouTube" className="social-logos youtube-logo"/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" className="social-logos"/>
                        <img src="https://static.vecteezy.com/system/resources/previews/021/460/265/original/tiktok-logo-transparent-free-png.png" alt="TikTok" className="social-logos"/>
                    </div>
                </div>
                <div className="footer-info">
                    <p>© 2023 Lazada Group</p>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;