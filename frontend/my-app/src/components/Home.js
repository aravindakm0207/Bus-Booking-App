/*
import React from 'react';

const Home = () => {
    return (
        <div>
           
            <div>
                <h1>Welcome to RedBus Clone</h1>
                <p>Your trusted platform for booking bus tickets and managing your trips.</p>
            </div>

          
            <section>
                <h2>Get Started</h2>
                <p>Follow these simple steps to book your bus tickets and enjoy your journey:</p>
                <ol>
                    <li>Step 1: Register or log in to your account.</li>
                    <li>Step 2: Search for buses to your desired destination.</li>
                    <li>Step 3: Choose your bus, select your seats, and proceed with payment.</li>
                    <li>Step 4: Enjoy your journey!</li>
                </ol>
            </section>

           
            <section>
                <h2>Learn More About RedBus Clone</h2>
                <div>
                    <div>
                        <h4>What We Do</h4>
                        <p>
                            RedBus Clone provides a platform for booking buses, managing your bookings, and viewing details for upcoming trips. 
                            We make travel easy, convenient, and accessible to everyone.
                        </p>
                    </div>
                    <div>
                        <h4>Why Choose Us?</h4>
                        <p>
                            With our user-friendly interface, secure payments, and easy access to tickets, we make your travel experience seamless.
                        </p>
                    </div>
                </div>
            </section>

            
            <section>
                <h2>Our Features</h2>
                <div>
                    <div>
                        <h5>Easy Booking</h5>
                        <p>Book bus tickets in just a few clicks and get the best travel options.</p>
                    </div>
                    <div>
                        <h5>Secure Payments</h5>
                        <p>Pay for tickets securely with our payment gateway, ensuring your transactions are safe.</p>
                    </div>
                    <div>
                        <h5>Customer Support</h5>
                        <p>Our customer support team is available 24/7 to assist you with any queries or issues.</p>
                    </div>
                </div>
            </section>

           
            <section>
                <h2>What Our Users Say</h2>
                <div>
                    <div>
                        <blockquote>
                            <p>"RedBus Clone has made my travel experience so much easier. I always find the best buses!"</p>
                            <footer>John Doe</footer>
                        </blockquote>
                    </div>
                    <div>
                        <blockquote>
                            <p>"The booking process is smooth, and I feel secure using their platform for payments."</p>
                            <footer>Jane Smith</footer>
                        </blockquote>
                    </div>
                    <div>
                        <blockquote>
                            <p>"Excellent platform with great customer support. I highly recommend it!"</p>
                            <footer>Michael Johnson</footer>
                        </blockquote>
                    </div>
                </div>
            </section>

           
            <section>
                <h2>Get In Touch</h2>
                <div>
                    <div>
                        <h4>Contact Us</h4>
                        <p>If you have any questions, feel free to reach out to us.</p>
                        <p>Email: support@redbusclone.com</p>
                        <p>Phone: +123 456 7890</p>
                    </div>
                    <div>
                        <h4>Visit Us</h4>
                        <p>Our office is located at:</p>
                        <p>123 Travel Street, Suite 100</p>
                        <p>Travel City, TC 12345</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
*/
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  
  Paper,
  Button,
} from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(https://source.unsplash.com/1600x900/?bus,travel)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#ffffff',
        pt: 5,
        pb: 5,
      }}
    >
      <Container maxWidth="lg" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 2, p: 3 }}>
        {/* Welcome Section */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h2" gutterBottom color="primary.light">
            Welcome to RedBus Clone
          </Typography>
          <Typography variant="body1" fontSize="1.2rem">
            Your trusted platform for booking bus tickets and managing your trips.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, px: 4, py: 1, fontSize: '1rem' }}
          >
            Get Started
          </Button>
        </Box>

        {/* Get Started Section */}
        <Box mb={5}>
          <Typography variant="h4" gutterBottom color="secondary.light">
            Get Started
          </Typography>
          <Typography variant="body1" gutterBottom fontSize="1.1rem">
            Follow these simple steps to book your bus tickets and enjoy your journey:
          </Typography>
          <List>
            {[
              'Step 1: Register or log in to your account.',
              'Step 2: Search for buses to your desired destination.',
              'Step 3: Choose your bus, select your seats, and proceed with payment.',
              'Step 4: Enjoy your journey!',
            ].map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={step} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Learn More Section */}
        <Box mb={5}>
          <Typography variant="h4" gutterBottom color="primary.light">
            Learn More About RedBus Clone
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    What We Do
                  </Typography>
                  <Typography>
                    RedBus Clone provides a platform for booking buses, managing your bookings, and viewing details for upcoming trips. 
                    We make travel easy, convenient, and accessible to everyone.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Why Choose Us?
                  </Typography>
                  <Typography>
                    With our user-friendly interface, secure payments, and easy access to tickets, we make your travel experience seamless.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Box mb={5}>
          <Typography variant="h4" gutterBottom color="secondary.light">
            Our Features
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Easy Booking',
                description: 'Book bus tickets in just a few clicks and get the best travel options.',
              },
              {
                title: 'Secure Payments',
                description:
                  'Pay for tickets securely with our payment gateway, ensuring your transactions are safe.',
              },
              {
                title: 'Customer Support',
                description: 'Our customer support team is available 24/7 to assist you with any queries or issues.',
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box mb={5}>
          <Typography variant="h4" gutterBottom color="primary.light">
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                quote: 'RedBus Clone has made my travel experience so much easier. I always find the best buses!',
                author: 'John Doe',
              },
              {
                quote: 'The booking process is smooth, and I feel secure using their platform for payments.',
                author: 'Jane Smith',
              },
              {
                quote: 'Excellent platform with great customer support. I highly recommend it!',
                author: 'Michael Johnson',
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                >
                  <Typography variant="body1">"{testimonial.quote}"</Typography>
                  <Typography variant="subtitle2" align="right">
                    - {testimonial.author}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Box>
          <Typography variant="h4" gutterBottom color="secondary.light">
            Get In Touch
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
              >
                <Typography variant="h5" gutterBottom>
                  Contact Us
                </Typography>
                <Typography>Email: support@redbusclone.com</Typography>
                <Typography>Phone: +123 456 7890</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
              >
                <Typography variant="h5" gutterBottom>
                  Visit Us
                </Typography>
                <Typography>123 Travel Street, Suite 100</Typography>
                <Typography>Travel City, TC 12345</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
