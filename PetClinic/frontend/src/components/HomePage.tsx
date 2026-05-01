import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
export default function HomePage() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: '#3572b9' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <img 
                            src="/Images,videos,audio/SPC Logo.jpeg" 
                            style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '16px' }} 
                            alt="SPC Logo" 
                        />
                        <Typography 
                            variant="h5" 
                            component="div" 
                            sx={{ fontWeight: 'bold', fontStyle: 'italic', display: { xs: 'none', md: 'block' } }}
                        >
                            SwaaS PawCare Clinic
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                        <Button color="inherit" href="#about">About</Button>
                        <Button color="inherit" href="#services">Services</Button>
            <Button color="inherit" href="#contact">Contact Us</Button>
            <Button color="inherit" component={Link} to="/login">Login/Register</Button>
            <Button variant="contained" color="secondary" sx={{ ml: 2 }}>Book Appointment</Button>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                <MenuItem onClick={handleCloseNavMenu} component="a" href="#about">
                    <Typography textAlign="center">About</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component="a" href="#services">
                    <Typography textAlign="center">Services</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component="a" href="#contact">
                    <Typography textAlign="center">Contact Us</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/login">
                    <Typography textAlign="center">Login/Register</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Book Appointment</Typography>
                </MenuItem>
            </Menu>
        </Box>
    </Toolbar>
</AppBar>

<br />

<div className="position-relative">
    <div className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src="/Images,videos,audio/pets images-2.jpg" className="d-block w-100" style={{ height: '60vh', objectFit: 'cover', borderRadius: '50px', opacity: 0.55 }} />
            </div>
            <div className="carousel-item">
                <img src="/Images,videos,audio/pets images-3.jpg" className="d-block w-100" style={{ height: '60vh', objectFit: 'cover', borderRadius: '50px', opacity: 0.55 }} />
            </div>
            <div className="carousel-item">
                <img src="/Images,videos,audio/pets images-4.jpg" className="d-block w-100" style={{ height: '60vh', objectFit: 'cover', borderRadius: '50px', opacity: 0.55 }} />
            </div>
            <div className="carousel-item">
                <img src="/Images,videos,audio/pets images-5.jpg" className="d-block w-100" style={{ height: '60vh', objectFit: 'cover', borderRadius: '50px', opacity: 0.55 }} />
            </div>
        </div>
    </div>

    <div className="position-absolute top-50 start-50 translate-middle text-center text-black text-bold " style={{ width: '80%' }} id="about">
        <h2 className="fw-bold mb-3">About SPC Clinic</h2>
        <p style={{ fontFamily: 'cursive', fontStyle: 'italic', fontWeight: 'bold', fontSize: 'x-large' }}>
           Swaas PawCare Clinic is a dedicated pet healthcare center committed to providing compassionate, reliable, and high-quality veterinary services. We focus on the overall well-being of pets through preventive care, accurate diagnosis, and personalized treatment plans. With experienced veterinarians, caring staff, and modern facilities, we ensure that every pet receives the attention and comfort they deserve. Our goal is to build long-term relationships with pet owners by offering trusted care in a safe and welcoming environment.
        </p>
    </div>
</div>
<br />
<section className="py-6 bg-light" >
    <div className="container" id="services">
        <br />
        <h2 className="text-center fw-bold mb-5" style={{ color: '#3572b9' }}>Our Services</h2>
        <div className="row text-center">

            <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body">
                        <img src="/Images,videos,audio/consultation image.jpg" className="img-fluid rounded" style={{ height: '60%' }} />
                        <br /><br />
                        <h5>Consultation</h5>
                        <p>Professional veterinary diagnosis and expert medical advice.</p>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#consultationModal">Learn More</button>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body">
                        <img src="/Images,videos,audio/vaccination.jpg" className="img-fluid rounded" style={{ height: '60%' }} />
                        <br /><br />
                        <h5>Vaccination & Care</h5>
                        <p>Preventive healthcare services and routine wellness programs.</p>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#vaccinationModal">Learn More</button>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body">
                        <img src="/Images,videos,audio/Daycare.jpg" className="img-fluid rounded" style={{ height: '60%' }} />
                        <br /><br />
                        <h5>Daycare Services</h5>
                        <p>Safe, supervised, and comfortable daycare for your pets.</p>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#daycareModal">Learn More</button>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body">
                        <img src="/Images,videos,audio/emergency.jpeg" className="img-fluid rounded" style={{ height: '60%' }} />
                        <br /><br />
                        <h5>Emergency & Urgent Care</h5>
                        <p>Immediate medical attention for critical and emergency cases.</p>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emergencyModal">Learn More</button>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body">
                        <img src="/Images,videos,audio/specialized care.webp" className="img-fluid rounded" style={{ height: '60%' }} />
                        <br /><br />
                        <h5>Specialized Medical Care</h5>
                        <p>Advanced treatment for complex and chronic conditions.</p>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#specializedmedicalModal">Learn More</button>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                    <div className="card-body">
                        <img src="/Images,videos,audio/Wellness and lifestyle.jpg" className="img-fluid rounded" style={{ height: '60%' }} />
                        <br /><br />
                        <h5>Wellness & Lifestyle</h5>
                        <p>Nutrition guidance and lifestyle support for long-term pet health.</p>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#wellnessLifestyleModal">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div className="modal fade" id="consultationModal" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Consultation</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
            <p>
                Our consultation service is designed to provide a thorough and compassionate evaluation of your pet&apos;s health.
                During the visit, our experienced veterinarians carefully examine your pet, understand the symptoms, and
                discuss medical history to identify the root cause of any concern.
            </p>

            <p>
                Based on the assessment, we provide a clear diagnosis along with personalized treatment recommendations,
                including medication, dietary guidance, or further diagnostic tests if required.
                Our goal is to ensure accurate treatment while keeping your pet comfortable and stress-free.
            </p>

            <p>
                Consultations are available for routine health checkups, illness evaluation, follow-up visits, and preventive
                care planning. We encourage pet owners to ask questions and actively participate in their pet&apos;s care journey.
                To book an appointment, please use the booking form or contact us directly. We look forward to providing the 
                best care for your beloved pet.
            </p>
            </div>
        </div>
    </div>
</div>

<div className="modal fade" id="vaccinationModal" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Vaccination & Care</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                <p>
                    Our vaccination and preventive care services are designed to protect your pet from common and preventable diseases. We follow medically approved vaccination schedules tailored to your pet&apos;s age, breed, and health condition.
                </p>

                <p>
                    In addition to vaccinations, our team provides routine health checkups, growth monitoring, and preventive screenings to ensure early detection of potential health issues.
                </p>

                <p>
                    Through regular care and timely vaccinations, we help maintain your pet&apos;s long-term health while reducing the risk of serious illnesses. 
                </p>
            </div>
        </div>
    </div>
</div>

<div className="modal fade" id="daycareModal" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Daycare Services</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                    <p>
                    Our daycare services provide a safe, clean, and supervised environment for your pets while you&apos;re away. 
                    We offer a range of activities including playtime, socialization, and rest periods to ensure your pet stays happy and engaged throughout the day.
                </p>

                <p>
                    Our experienced caregivers monitor your pet closely, ensuring their safety and well-being at all times. 
                    We also provide regular updates and photos to keep you connected with your pet during their stay.
                </p>

                <p>
                    Whether for a few hours or a full day, our daycare services offer a reliable and caring solution for pet owners who want the best for their pets.
                </p>
            </div>
        </div>
    </div>
</div>

<div className="modal fade" id="emergencyModal" tabIndex={-1}>
     <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Emergency Services</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                <p>
                    Our emergency services are available 24/7 to provide immediate care for your pets during critical situations. 
                    Our experienced veterinarians are equipped to handle a wide range of emergencies, including injuries, sudden illnesses, and trauma.
                </p>

                <p>
                    We provide prompt assessment, stabilization, and treatment to ensure your pet receives the best possible care during emergencies. 
                    Our team works closely with pet owners to provide timely updates and guidance throughout the treatment process.
                </p>

                <p>
                    If your pet is experiencing a medical emergency, please contact us immediately at [Phone Number] or visit our clinic at [Address]. 
                    We are committed to providing immediate and compassionate care to help your pet recover quickly and safely.
                </p>
            </div>
        </div>
    </div>
</div>  

<div className="modal fade" id="specializedmedicalModal" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Specialized Medical Care</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                <p>
                    Our specialized medical care services provide advanced treatment options for pets with complex health conditions. 
                    Our experienced veterinarians are equipped to handle a wide range of medical cases, including chronic illnesses, 
                    age-related conditions, and post-surgical care.
                </p>

                <p>
                    We provide prompt assessment, stabilization, and treatment to ensure your pet receives the best possible care. 
                    Our team works closely with pet owners to provide timely updates and guidance throughout the treatment process.
                </p>

                <p>
                    If your pet is experiencing a medical emergency, please contact us immediately at [Phone Number] or visit our clinic at [Address].
                </p>
            </div>
        </div>
    </div>
</div>


<div className="modal fade" id="wellnessLifestyleModal" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Wellness & Lifestyle</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                <p>
                    Our wellness and lifestyle services focus on preventive care and long-term health management for your pet. 
                    We provide personalized nutrition guidance, weight management support, and lifestyle recommendations.
                </p>

                <p>
                    Our team works closely with pet owners to create customized wellness plans that promote overall health and prevent chronic conditions.
                </p>

                <p>
                    Through regular monitoring and expert guidance, we help ensure your pets stay happy, healthy, and active.
                </p>
            </div>
        </div>
    </div>
</div>


<section className="py-5">
    <div className="container">
        <h2 className="text-center fw-bold mb-4">Why Choose Us</h2>
        <div className="row text-center">
            <div className="col-md-3" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <img src="/Images,videos,audio/veternary doctors.jpg" alt="Veterinary Doctors" />
                <p>Experienced Veterinarians</p></div>
            <div className="col-md-3" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <img src="/Images,videos,audio/modern facilities.jpeg" alt="Modern Facilities" />
                <p>Modern Facilities</p></div>
            <div className="col-md-3" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <img src="/Images,videos,audio/compassionate care.jpeg" alt="Compassionate Care" />
                <p>Compassionate Care</p></div>
            <div className="col-md-3" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }} >
                <img src="/Images,videos,audio/pet owners.jpeg" alt="Pet Owners" />
                <p>Trusted by Pet Owners</p></div>
        </div>
    </div>
</section>

<section className="py-5 bg-light">
    <div className="container">
        <div className="row text-center">
            <div className="col-md-3"><h3>10+</h3><p>Years Experience</p></div>
            <div className="col-md-3"><h3>5000+</h3><p>Pets Treated</p></div>
            <div className="col-md-3"><h3>15+</h3><p>Staff Members</p></div>
            <div className="col-md-3"><h3>24/7</h3><p>Emergency Support</p></div>
        </div>
    </div>
</section>

<section className="happy-clients-section py-5">
  <div className="container">
    
    <div className="text-center mb-5">
      <h2 className="section-title">Our Happy Clients</h2>
      <p className="section-subtitle">
        Trusted by clients who value quality, creativity, and results.
      </p>
    </div>

    <div className="row g-4">
      
      <div className="col-md-6 col-lg-4">
        <div className="testimonial-card">
          <div className="client-image">
            <img src="/Images,videos,audio/client1.jpeg" alt="Client" />
          </div>
          <p className="testimonial-text">
            &quot;This team exceeded our expectations. The design was clean,
            professional, and delivered on time. Highly recommended!&quot;
          </p>
          <h5 className="client-name">Rahul Sharma</h5>
          <span className="client-role">Business Owner</span>
            <div className="stars">⭐⭐⭐⭐⭐</div>
        </div>
      </div>

      <div className="col-md-6 col-lg-4">
        <div className="testimonial-card">
          <div className="client-image">
            <img src="/Images,videos,audio/client2.jpeg" alt="Client" />
          </div>
          <p className="testimonial-text">
            &quot;Amazing experience! Their attention to detail and creativity
            really helped our brand stand out.&quot;
          </p>
          <h5 className="client-name">Ananya Patel</h5>
          <span className="client-role">Marketing Manager</span>
          <div className="stars">⭐⭐⭐⭐⭐</div>
        </div>
      </div>

      <div className="col-md-6 col-lg-4">
        <div className="testimonial-card">
          <div className="client-image">
            <img src="/Images,videos,audio/client3.jpg" alt="Client" />
          </div>
          <p className="testimonial-text">
            &quot;Professional, responsive, and highly skilled. We&apos;re extremely
            happy with the final result.&quot;
          </p>
          <h5 className="client-name">Vikram Singh</h5>
          <span className="client-role">Startup Founder</span>
          <div className="stars">⭐⭐⭐⭐⭐</div>
        </div>
      </div>

    </div>
  </div>
</section>


<section className="py-5 text-center bg-light">
    <div className="container">
        <h2 className="fw-bold mb-3">Give Your Pet the Care They Deserve</h2>
        <p className="mb-4">Book an appointment today and experience trusted veterinary care.</p>
        <button className="btn btn-primary me-2">Book Appointment</button>
    </div>
</section>

<section className="py-5">
    <div className="container" id="contact">
        <h2 className="text-center fw-bold mb-4">Contact Us</h2>
        <div className="row text-center">
            <div className="col-md-4">B16&amp;B17, 3rd Floor, SKCL Excellence, Guindy, Chennai - 600032 </div>
            <div className="col-md-4">+91 9876543210</div>
            <div className="col-md-4">support@spcclinic.com</div>
        </div>
    </div>
</section>

<footer className="py-3">
    <div className="container text-center">
        <p className="mb-0 text-white">© 2026 SPC Project. All rights reserved.</p>
    </div>
</footer>

        </>
    );
}