document.addEventListener('DOMContentLoaded', function() {
  // Load language from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if (lang === 'ar') {
    switchLanguage();
  }

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
        const response = await fetch('login.php', {
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
        const response = await fetch('register.php', {
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
        const response = await fetch('contact.php', {
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

  // Admin login button click
  const adminLoginButton = document.querySelector('.admin-form button');
  const adminForm = document.querySelector('.admin-form');
  if (adminLoginButton && adminForm) {
    adminLoginButton.addEventListener('click', function() {
      const username = adminForm.username.value;
      const password = adminForm.password.value;

      if (username === 'Usuul' && password === 'DOMDOM@1975') {
        window.location.href = 'admin-contacts.html';
      } else {
        document.getElementById('admin-error').style.display = 'block';
      }
    });
  }

  // Show password toggle
  const showPasswordCheckbox = document.getElementById('show-password');
  if (showPasswordCheckbox) {
    showPasswordCheckbox.addEventListener('change', function() {
      const passwordField = document.querySelector('.admin-form input[name="password"]');
      if (passwordField) {
        passwordField.type = this.checked ? 'text' : 'password';
      }
    });
  }

  // Load events dynamically
  const eventsContainer = document.getElementById('events-container');
  if (eventsContainer) {
    fetch('events.php')
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

  // Language switch functionality
  window.switchLanguage = function() {
    const elements = document.querySelectorAll('[data-en]');
    let isSwitchingToArabic = false;
    elements.forEach(element => {
      const currentText = element.textContent.trim();
      const englishText = element.getAttribute('data-en').trim();
      if (currentText === englishText) {
        isSwitchingToArabic = true;
      }
    });

    elements.forEach(element => {
      const englishText = element.getAttribute('data-en');
      const arabicText = element.getAttribute('data-ar');
      if (isSwitchingToArabic) {
        element.textContent = arabicText;
        element.setAttribute('dir', 'rtl');
      } else {
        element.textContent = englishText;
        element.removeAttribute('dir');
      }
    });

    // Update URL with language parameter
    const newLang = isSwitchingToArabic ? 'ar' : 'en';
    const url = new URL(window.location);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url);
  };
});
