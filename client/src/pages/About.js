// Information about the founder, contact form

import React from 'react';
import profileImage from "../assets/images/profile.png"
import ContactForm from '../components/Contact';


const About = () => {
    return (
        <section className="my-5">
          <h1 id="about">About Dark Room</h1>
          <img src={profileImage} className="my-2" style={{ width: "20%" }} alt="profile photo" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue metus, commodo at maximus nec, suscipit eget libero. Phasellus dapibus nisl justo, luctus faucibus sapien efficitur elementum. Pellentesque ut risus ut augue finibus pellentesque feugiat id quam. Praesent vel ligula sed tortor hendrerit suscipit in at sem. Vivamus eu elit quis augue congue bibendum vel in ipsum. Nunc sed ullamcorper purus. Nam sed euismod sapien. Etiam eu justo at nibh aliquam convallis. Praesent rhoncus, neque eu imperdiet aliquet, odio nulla placerat orci, sodales pharetra leo purus vel neque. Vivamus felis metus, hendrerit fringilla tempus sit amet, commodo tristique purus. Mauris cursus ex vel sapien pulvinar, dignissim vulputate elit cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>
          <ContactForm></ContactForm>
        </section>
    );
    // return(
    //     React.createElement("section", {}, [
    //         React.createElement("h1", {} ["Who am I?"])
    //     ])
    // );
}

export default About;