import React, { useEffect, useRef, useState } from 'react'
import "./styles.css";
import "./main.js";
import HomeImage from "../../assets/images/home3.webp"
import AboutImage from "../../assets/images/aboutimg.jfif"
import ScrollReveal from 'scrollreveal'
import LoginModal from './loginModal';
import RegisterModal from './registerModal';
function Index() {
    const [onToggle, setonToggle] = useState(true);

    const [openLoginModal, setopenLoginModal] = useState(false);
    const [openRegisterModal, setopenRegisterModal] = useState(false);

    const handleNavToggle = () => {
        setonToggle(!onToggle);
        console.log("sd");
    }



    useEffect(() => {
        console.log("Tamam 1");
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2800,
            // reset: true,
        })

        console.log("Tamam 2");
        sr.reveal(`.home__container`, {
            origin: 'left',
            interval: 100,
        })

        sr.reveal(`.info,.nav__item`, {
            origin: 'top',
            interval: 100,
            delay: 100
        })

        console.log("Tamam 3");
    }, [])


    return (

        <>
            <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet"></link>
            <link href="https://unicons.iconscout.com/release/v3.0.6/css/line.css" rel="stylesheet"></link>

            <header className='header' id='header'>
                <nav className='nav container'>
                    <a href="#" className="nav__logo">RentACar</a>

                    <div id="nav-menu"
                        className={onToggle ? "nav__menu" : "nav__menu show-menu"}

                    >
                        <ul className="nav__list">
                            <li className="nav__item">
                                <a href="#home" className="nav__link active-link">Home</a>
                            </li>
                            <li className="nav__item">
                                <a href="#about" className="nav__link">About</a>
                            </li>
                            <li className="nav__item">
                                <a href="#discover" className="nav__link">Discover</a>
                            </li>
                            <li className="nav__item">
                                <a href="#home" className="nav__link" onClick={() => setopenRegisterModal(true)}>Register</a>
                            </li>
                            <li className="nav__item">
                                <a href="#home" className="nav__link" onClick={() => setopenLoginModal(true)}>Login</a>
                            </li>
                        </ul>

                        <div className="nav__dark">
                            <span className="change-theme-name">Dark mode</span>
                            <i className="ri-moon-line change-theme" id="theme-button"></i>
                        </div>
                        <i className="ri-close-line nav__close" id="nav-close" onClick={handleNavToggle}></i>
                    </div>

                    <div className="nav__toggle" id="nav-toggle" onClick={handleNavToggle} >
                        <i className="ri-function-line"></i>
                    </div>
                </nav>
            </header>

            <LoginModal 
                open={openLoginModal}
                onClose={() => setopenLoginModal(false)}
            ></LoginModal>

            
<RegisterModal 
                open={openRegisterModal}
                onClose={() => setopenRegisterModal(false)}
            ></RegisterModal>

            <div className="main">
                <section className="home" id="home">
                    <img src={HomeImage} alt="" className="home__img" />

                    <div className="home__container container grid">
                        <div className="home__data">
                            <span className="home__data-subtitle">Discover your place</span>
                            <h1 className="home__data-title">Explore The <br></br> Best <b>Beautiful</b> <b><br></br>Beaches</b></h1>
                            <a href="#" className="button">Explore</a>
                        </div>
                        <div className="home__social">
                            <a href="https://www.facebook.com/" target="_blank" className="home__social-link">
                                <i className="ri-facebook-box-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" className="home__social-link">
                                <i className="ri-instagram-fill"></i>
                            </a>
                            <a href="https://twitter.com/" target="_blank" className="home__social-link">
                                <i className="ri-twitter-fill"></i>
                            </a>
                        </div>
                    </div>



                </section>

                <section className="about section" id="about">
                    <h2 className="section__title">About Our</h2>
                    <span className="section__subtitle">Who Are We ?</span>
                    <div className="about__container container grid">
                        <img src={AboutImage} alt="" className="about__img" />
                        <div class="about__data">
                            <p class="about__description">Web developer, with extensive knowledge and years of experience, working in web technologies and Ui / Ux design, delivering quality work.</p>
                            <div class="about__info">
                                <div class="info">
                                    <span class="about__info-title">02+</span>
                                    <span class="about__info-name">Years <br></br> expreience</span>
                                </div>
                                <div class="info">
                                    <span class="about__info-title">20+</span>
                                    <span class="about__info-name">Happy <br></br> Customer</span>
                                </div >
                                <div class="info">
                                    <span class="about__info-title">100+</span>
                                    <span class="about__info-name">Number of <br></br> Vehicles</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>




            <script src="./main.js"></script>
        </>
    )
}

export default Index