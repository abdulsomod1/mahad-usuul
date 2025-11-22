document.addEventListener('DOMContentLoaded', function() {
  // Navigation toggle for mobile
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Contact form submission via Next.js API
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      try {
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to send message');
        }

        alert('Message sent successfully!');
        contactForm.reset();
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message. Please try again.');
      }
    });
  }
});
