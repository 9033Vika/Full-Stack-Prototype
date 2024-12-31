import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <>
      <div className="contact_us_6">
        <div className="responsive-container-block container">
          <form
            className="form-box"
            action="https://api.web3forms.com/submit"
            method="POST"
          >
            <input
              type="hidden"
              name="access_key"
              value="4d32d730-0a78-4509-977d-91189c2187e8"
            />
            <div className="container-block form-wrapper">
              <div className="mob-text">
                <p className="text-blk contactus-head">Get in Touch</p>
                <p className="text-blk contactus-subhead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
                  diam lectus sapien.
                </p>
              </div>
              <div className="responsive-container-block" id="i2cbk">
                <div
                  className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                  id="i10mt-3"
                >
                  <p className="text-blk input-title">FIRST NAME</p>
                  <input
                    className="input"
                    id="ijowk-3"
                    name="FirstName"
                    placeholder="Please enter first name..."
                    required
                  />
                </div>
                <div
                  className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                  id="ip1yp"
                >
                  <p className="text-blk input-title">EMAIL</p>
                  <input
                    className="input"
                    id="ipmgh-3"
                    name="Email"
                    placeholder="Please enter email..."
                    required
                  />
                </div>
                <div
                  className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                  id="ih9wi"
                >
                  <p className="text-blk input-title">PHONE NUMBER</p>
                  <input
                    className="input"
                    id="imgis-3"
                    name="PhoneNumber"
                    placeholder="Please enter phone number..."
                    required
                  />
                </div>
                <div
                  className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                  id="i634i-3"
                >
                  <p className="text-blk input-title">
                    WHAT DO YOU HAVE IN MIND ?
                  </p>
                  <textarea
                    className="textinput"
                    id="i5vyy-3"
                    placeholder="Please enter query..."
                    name="message"
                    required
                    minLength={20}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="submit-btn"
                id="w-c-s-bgc_p-1-dm-id-2"
              >
                Submit
              </button>
            </div>
          </form>
          <div
            className="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12"
            id="i772w"
          >
            <div className="map-part">
              <p
                className="text-blk map-contactus-head"
                id="w-c-s-fc_p-1-dm-id"
              >
                Reach us at
              </p>
              <p className="text-blk map-contactus-subhead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
                diam lectus sapien.
              </p>
              <div className="social-media-links mob">
                <a className="social-icon-link" href="#" id="ix94i-2-2">
                  <img
                    className="link-img image-block"
                    src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
                  />
                </a>
                <a className="social-icon-link" href="#" id="itixd">
                  <img
                    className="link-img image-block"
                    src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"
                  />
                </a>
                <a className="social-icon-link" href="#" id="izxvt">
                  <img
                    className="link-img image-block"
                    src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
                  />
                </a>
                <a className="social-icon-link" href="#" id="izldf-2-2">
                  <img
                    className="link-img image-block"
                    src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
                  />
                </a>
              </div>
              <iframe
                className="map-box"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d437.585526198608!2d77.28342264980944!3d28.6691727118715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfc83d3d7f7b5%3A0xe658bc5e0a50c363!2sBalaji%20Nursing%20Home!5e0!3m2!1sen!2sin!4v1729339911101!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: "0" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p className="footer-text">All rights are reserved</p>
      </div>
    </>
  );
};

export default Footer;
