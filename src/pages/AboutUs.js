import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className='about-us-container'>
      <header className='about-us-header'>
        <h1>About Us</h1>
        <p>Welcome to RideOK - Your Trusted Travel Companion</p>
      </header>

      <section className='about-us-content'>
        <div className='about-us-info'>
          <h2>About Me</h2>
          <p>
            Hi, I’m Ayush Verma, a passionate tech enthusiast and web developer.
            With experience in front-end and back-end technologies, I strive to
            create impactful digital solutions.
          </p>
        </div>

        <div className='contact-section'>
          <h2>Get in Touch</h2>
          <p>
            If you’d like to collaborate or have any inquiries, feel free to
            reach out!
          </p>
          <ul className='contact-list'>
            <li>Email: verma.ayush1708@gmail.com</li>
            <li>
              LinkedIn:{' '}
              <a
                href='https://www.linkedin.com/in/ayush-verma-/'
                target='_blank'
                rel='noopener noreferrer'
              >
                linkedin.com/in/ayushverma
              </a>
            </li>
            <li>
              GitHub:{' '}
              <a
                href='https://github.com/ayush-verma1708'
                target='_blank'
                rel='noopener noreferrer'
              >
                github.com/ayushverma
              </a>
            </li>
          </ul>
        </div>
      </section>

      <footer className='about-us-footer'>
        <p>Thank you for visiting RideOK. Let's make your journey memorable!</p>
      </footer>
    </div>
  );
};

export default AboutUs;

// import React from 'react';
// import './AboutUs.css';

// const AboutUs = () => {
//   return (
//     <div className='about-us-container'>
//       <header className='about-us-header'>
//         <h1>About Us</h1>
//         <p>Welcome to RideOK - Your Reliable Travel Companion</p>
//       </header>

//       <section className='about-us-content'>
//         <div className='about-us-info'>
//           <h2>About Ayush Verma</h2>
//           <p>
//             I am Ayush Verma, a final-year B.Tech CSE student at Amity
//             University, Uttar Pradesh, with a CGPA of 7.5/10. I am passionate
//             about technology and innovation, with hands-on experience in web
//             development, software development, and graphic designing.
//           </p>
//           <p>
//             As a Freelance Developer for The Meraki Store, I designed an
//             engaging, SEO-optimized portfolio website. During my internships at
//             BigDream Infoservices and Prospeer, I contributed to front-end
//             development, enhancing the user experience and adding features to
//             their Lead Management Systems.
//           </p>
//         </div>

//         <div className='skills-section'>
//           <h2>Skills & Expertise</h2>
//           <ul>
//             <li>Proficient in Django, Python, and C++</li>
//             <li>Experience with Shopify for responsive web design</li>
//             <li>Expertise in HTML, CSS, JavaScript</li>
//             <li>Graphic designing and algorithm development</li>
//           </ul>
//         </div>

//         <div className='projects-section'>
//           <h2>Noteworthy Projects</h2>
//           <ul>
//             <li>Buddy Finder - A Chat Room platform</li>
//             <li>
//               TalkItOut - Mental Health Chatbot using Django and WebSocket
//             </li>
//             <li>Lead Management System for BigDream Infoservices</li>
//             <li>Portfolio Website for The Meraki Store</li>
//           </ul>
//         </div>

//         <div className='roles-section'>
//           <h2>Leadership & Contributions</h2>
//           <p>
//             As the Technical Head of the IET Student Chapter at Amity
//             University, I enhanced audience engagement through effective social
//             media and promotional strategies. My roles as Event Manager at
//             Litwit Club and Core Team Member in the Virtual Reality Game
//             Development Club reflect my commitment to fostering innovation and
//             collaboration.
//           </p>
//         </div>
//       </section>

//       <footer className='about-us-footer'>
//         <p>Let's ride together with confidence and innovation at RideOK!</p>
//       </footer>
//     </div>
//   );
// };

// export default AboutUs;

// // import React from 'react';
// // import {
// //   Container,
// //   Typography,
// //   Box,
// //   Avatar,
// //   Grid,
// //   Card,
// //   CardContent,
// //   Button,
// // } from '@mui/material';
// // import { AccessibilityNew, RocketLaunch, PeopleAlt } from '@mui/icons-material';
// // import { Link } from 'react-router-dom';

// // const AboutMe = () => {
// //   return (
// //     <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
// //       {/* Hero Section */}
// //       <Box
// //         sx={{
// //           textAlign: 'center',
// //           mb: 6,
// //           py: 6,
// //           bgcolor: 'primary.main',
// //           color: 'white',
// //           borderRadius: 2,
// //           boxShadow: 3,
// //         }}
// //       >
// //         <Typography variant='h3' fontWeight='bold' gutterBottom>
// //           Hi, I'm Ayush Verma
// //         </Typography>
// //         <Typography variant='subtitle1' gutterBottom>
// //           A passionate developer, problem-solver, and advocate for sustainable
// //           innovation.
// //         </Typography>
// //         <Typography variant='body1' sx={{ maxWidth: 700, mx: 'auto', mt: 2 }}>
// //           With a strong background in software development and experience in
// //           building user-centric applications, I strive to create impactful
// //           digital solutions. Whether it’s designing intuitive user interfaces or
// //           optimizing backend systems, I believe in pushing boundaries to deliver
// //           excellence.
// //         </Typography>
// //       </Box>

// //       {/* About Section */}
// //       <Grid container spacing={4} alignItems='center'>
// //         <Grid item xs={12} md={4}>
// //           <Box textAlign='center'>
// //             <Avatar
// //               sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
// //               src='/path-to-your-photo.jpg'
// //               alt='Ayush Verma'
// //             />
// //             <Typography variant='h5' fontWeight='bold'>
// //               Ayush Verma
// //             </Typography>
// //             <Typography variant='body2' color='text.secondary'>
// //               Software Developer | Innovator | Mentor
// //             </Typography>
// //           </Box>
// //         </Grid>
// //         <Grid item xs={12} md={8}>
// //           <Card elevation={3} sx={{ p: 3 }}>
// //             <CardContent>
// //               <Typography variant='h6' gutterBottom>
// //                 My Story
// //               </Typography>
// //               <Typography variant='body1' color='text.secondary'>
// //                 My journey in the tech world began during my B.Tech in Computer
// //                 Science, where I honed my skills in Python, Django, and
// //                 full-stack development. Over the years, I have contributed to
// //                 impactful projects like "TalkItOut" — a mental health chatbot,
// //                 and "Buddy Finder" — a real-time chat application. Beyond
// //                 technical expertise, I take pride in leading teams, organizing
// //                 events, and fostering community growth.
// //               </Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       {/* Skills & Values Section */}
// //       <Box sx={{ mt: 6 }}>
// //         <Typography
// //           variant='h5'
// //           fontWeight='bold'
// //           gutterBottom
// //           sx={{ textAlign: 'center' }}
// //         >
// //           My Core Values
// //         </Typography>
// //         <Grid container spacing={4}>
// //           <Grid item xs={12} sm={6} md={3}>
// //             <Card elevation={3}>
// //               <CardContent sx={{ textAlign: 'center' }}>
// //                 <Typography variant='h6' fontWeight='bold' mt={2}>
// //                   Sustainability
// //                 </Typography>
// //                 <Typography variant='body2' color='text.secondary'>
// //                   Advocating for eco-friendly practices in technology and
// //                   beyond.
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //           <Grid item xs={12} sm={6} md={3}>
// //             <Card elevation={3}>
// //               <CardContent sx={{ textAlign: 'center' }}>
// //                 <AccessibilityNew sx={{ fontSize: 50, color: 'blue' }} />
// //                 <Typography variant='h6' fontWeight='bold' mt={2}>
// //                   Inclusivity
// //                 </Typography>
// //                 <Typography variant='body2' color='text.secondary'>
// //                   Creating solutions that are accessible and beneficial to all.
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //           <Grid item xs={12} sm={6} md={3}>
// //             <Card elevation={3}>
// //               <CardContent sx={{ textAlign: 'center' }}>
// //                 <RocketLaunch sx={{ fontSize: 50, color: 'purple' }} />
// //                 <Typography variant='h6' fontWeight='bold' mt={2}>
// //                   Innovation
// //                 </Typography>
// //                 <Typography variant='body2' color='text.secondary'>
// //                   Driving progress through creative and technical excellence.
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //           <Grid item xs={12} sm={6} md={3}>
// //             <Card elevation={3}>
// //               <CardContent sx={{ textAlign: 'center' }}>
// //                 <PeopleAlt sx={{ fontSize: 50, color: 'orange' }} />
// //                 <Typography variant='h6' fontWeight='bold' mt={2}>
// //                   Collaboration
// //                 </Typography>
// //                 <Typography variant='body2' color='text.secondary'>
// //                   Building communities and fostering teamwork to achieve goals.
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         </Grid>
// //       </Box>

// //       {/* Call-to-Action Section */}
// //       <Box
// //         sx={{
// //           mt: 8,
// //           py: 6,
// //           textAlign: 'center',
// //           bgcolor: 'secondary.light',
// //           borderRadius: 2,
// //           boxShadow: 3,
// //         }}
// //       >
// //         <Typography variant='h5' fontWeight='bold' gutterBottom>
// //           Let’s Build Something Amazing Together
// //         </Typography>
// //         <Typography
// //           variant='body1'
// //           color='text.secondary'
// //           sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
// //         >
// //           I’m always open to collaborating on exciting projects or discussing
// //           innovative ideas. Let’s connect and turn visions into reality.
// //         </Typography>
// //         <Button
// //           variant='contained'
// //           color='primary'
// //           size='large'
// //           component={Link}
// //           to='/contact'
// //         >
// //           Contact Me
// //         </Button>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default AboutMe;

// // // import React from 'react';
// // // import {
// // //   Container,
// // //   Typography,
// // //   Box,
// // //   Avatar,
// // //   Grid,
// // //   Card,
// // //   CardContent,
// // //   Button,
// // // } from '@mui/material';
// // // import { Nature, DirectionsCar, Group, Person } from '@mui/icons-material';
// // // import { Link } from 'react-router-dom';

// // // const AboutUs = () => {
// // //   return (
// // //     <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
// // //       {/* Header Section */}
// // //       <Box
// // //         sx={{
// // //           textAlign: 'center',
// // //           mb: 4,
// // //           py: 4,
// // //           bgcolor: 'primary.light',
// // //           borderRadius: 2,
// // //         }}
// // //       >
// // //         <Typography variant='h4' fontWeight='bold' gutterBottom>
// // //           About RideOK
// // //         </Typography>
// // //         <Typography variant='subtitle1' color='text.secondary'>
// // //           Making carpooling smarter, sustainable, and effortless.
// // //         </Typography>
// // //       </Box>

// // //       {/* Founder Section */}
// // //       <Grid container spacing={4} alignItems='center'>
// // //         <Grid item xs={12} md={4}>
// // //           <Box textAlign='center'>
// // //             <Avatar
// // //               sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
// // //               src='/path-to-your-photo.jpg'
// // //               alt='Your Name'
// // //             />
// // //             <Typography variant='h5' fontWeight='bold'>
// // //               [Your Name]
// // //             </Typography>
// // //             <Typography variant='body2' color='text.secondary'>
// // //               Founder of RideOK
// // //             </Typography>
// // //           </Box>
// // //         </Grid>
// // //         <Grid item xs={12} md={8}>
// // //           <Card elevation={3}>
// // //             <CardContent>
// // //               <Typography variant='h6' gutterBottom>
// // //                 My Vision
// // //               </Typography>
// // //               <Typography variant='body1' color='text.secondary'>
// // //                 I started RideOK with a vision to revolutionize transportation
// // //                 by making carpooling simple, safe, and eco-friendly. Our goal is
// // //                 to reduce traffic congestion, lower carbon emissions, and make
// // //                 travel more affordable and convenient. With RideOK, I aim to
// // //                 encourage communities to adopt sustainable practices while
// // //                 fostering collaboration and trust among individuals.
// // //               </Typography>
// // //             </CardContent>
// // //           </Card>
// // //         </Grid>
// // //       </Grid>

// // //       {/* Features Section */}
// // //       <Box sx={{ mt: 6 }}>
// // //         <Typography variant='h5' fontWeight='bold' gutterBottom>
// // //           Why RideOK?
// // //         </Typography>
// // //         <Grid container spacing={4}>
// // //           <Grid item xs={12} sm={6} md={3}>
// // //             <Card elevation={3}>
// // //               <CardContent sx={{ textAlign: 'center' }}>
// // //                 <Nature sx={{ fontSize: 50, color: 'green' }} />
// // //                 <Typography variant='h6' fontWeight='bold' mt={2}>
// // //                   Eco-Friendly
// // //                 </Typography>
// // //                 <Typography variant='body2' color='text.secondary'>
// // //                   By sharing rides, we reduce fuel consumption and lower CO2
// // //                   emissions, contributing to a greener planet.
// // //                 </Typography>
// // //               </CardContent>
// // //             </Card>
// // //           </Grid>
// // //           <Grid item xs={12} sm={6} md={3}>
// // //             <Card elevation={3}>
// // //               <CardContent sx={{ textAlign: 'center' }}>
// // //                 <DirectionsCar sx={{ fontSize: 50, color: 'blue' }} />
// // //                 <Typography variant='h6' fontWeight='bold' mt={2}>
// // //                   Convenient
// // //                 </Typography>
// // //                 <Typography variant='body2' color='text.secondary'>
// // //                   Plan and schedule rides effortlessly with an intuitive
// // //                   interface designed for everyday use.
// // //                 </Typography>
// // //               </CardContent>
// // //             </Card>
// // //           </Grid>
// // //           <Grid item xs={12} sm={6} md={3}>
// // //             <Card elevation={3}>
// // //               <CardContent sx={{ textAlign: 'center' }}>
// // //                 <Group sx={{ fontSize: 50, color: 'purple' }} />
// // //                 <Typography variant='h6' fontWeight='bold' mt={2}>
// // //                   Community-Driven
// // //                 </Typography>
// // //                 <Typography variant='body2' color='text.secondary'>
// // //                   Building trust and collaboration through a network of verified
// // //                   users sharing rides together.
// // //                 </Typography>
// // //               </CardContent>
// // //             </Card>
// // //           </Grid>
// // //           <Grid item xs={12} sm={6} md={3}>
// // //             <Card elevation={3}>
// // //               <CardContent sx={{ textAlign: 'center' }}>
// // //                 <Person sx={{ fontSize: 50, color: 'orange' }} />
// // //                 <Typography variant='h6' fontWeight='bold' mt={2}>
// // //                   User-Focused
// // //                 </Typography>
// // //                 <Typography variant='body2' color='text.secondary'>
// // //                   Designed with you in mind, RideOK ensures an easy, secure, and
// // //                   personalized carpooling experience.
// // //                 </Typography>
// // //               </CardContent>
// // //             </Card>
// // //           </Grid>
// // //         </Grid>
// // //       </Box>

// // //       {/* Call-to-Action Section */}
// // //       <Box
// // //         sx={{
// // //           mt: 6,
// // //           py: 4,
// // //           textAlign: 'center',
// // //           bgcolor: 'secondary.light',
// // //           borderRadius: 2,
// // //         }}
// // //       >
// // //         <Typography variant='h5' fontWeight='bold' gutterBottom>
// // //           Join the RideOK Movement
// // //         </Typography>
// // //         <Typography variant='body1' color='text.secondary' mb={3}>
// // //           Together, we can create a cleaner, more connected world. Start your
// // //           carpooling journey with RideOK today.
// // //         </Typography>
// // //         <Button
// // //           variant='contained'
// // //           color='primary'
// // //           size='large'
// // //           component={Link}
// // //           to='/onboarding'
// // //         >
// // //           Get Started
// // //         </Button>
// // //       </Box>
// // //     </Container>
// // //   );
// // // };

// // // export default AboutUs;
