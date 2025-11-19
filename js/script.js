document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Show register form
  const showRegisterLink = document.getElementById('show-register');
  const registerForm = document.querySelector('.register-form');
  const loginForm = document.querySelector('.login-form');

  if (showRegisterLink && registerForm && loginForm) {
    showRegisterLink.addEventListener('click', function(e) {
      e.preventDefault();
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  }

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
          alert('Login successful!');
          location.reload();
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert('Login failed. Please try again.');
      }
    });
  }

  // Register form submission
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
          alert('Registration successful! Please login.');
          registerForm.style.display = 'none';
          loginForm.style.display = 'block';
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert('Registration failed. Please try again.');
      }
    });
  }

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
          alert('Message sent successfully!');
          this.reset();
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert('Failed to send message. Please try again.');
      }
    });
  }

  // Load events dynamically
  const eventsContainer = document.getElementById('events-container');
  if (eventsContainer) {
    fetch('/api/events')
      .then(response => response.json())
      .then(events => {
        events.forEach(event => {
          const eventElement = document.createElement('div');
          eventElement.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
            <p>Location: ${event.location}</p>
          `;
          eventsContainer.appendChild(eventElement);
        });
      })
      .catch(error => console.error('Failed to load events:', error));
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // Observe all sections for animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
});
