// Information about the founder, contact form

import React from 'react';
import profileImage from "../assets/images/profile.png"
import ContactForm from '../components/Contact';


const About = () => {
    return (
        <section className="my-5">
          <h1 id="about">About Chelcie</h1>
            <div className="about-section">
              <img id="photo-chelcie" src={profileImage} className="my-2 responsive" style={{ width: "20%" }} alt="The one and only Chelcie" />
            </div>
          <p id="description-about" >Chelcie is a proud dad of 4 cats, and likes to make dad jokes constantly. He is a traitor to PawPals, and his arch-nemesis is Sequelize.
          </p>
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