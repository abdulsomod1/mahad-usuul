document.addEventListener('DOMContentLoaded', function() {
  // Navigation toggle for mobile
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Contact form submission with Supabase integration
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Import Supabase client from lib/supabase.js
      const { supabase } = await import('./lib/supabase.js');

      try {
        const { data, error } = await supabase
          .from('contacts') // Assuming 'contacts' is the table name in Supabase
          .insert([{ name, email, message }]);

        if (error) throw error;

        alert('Message sent successfully!');
        contactForm.reset();
      } catch (error) {
        console.error('Error sending message:', error.message);
        alert('Error sending message. Please try again.');
      }
    });
  }
});
