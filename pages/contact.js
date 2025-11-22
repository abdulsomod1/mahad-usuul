import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`Error: ${json.error}`);
      }
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <textarea name="message" placeholder="Message" required value={formData.message} onChange={handleChange} />
        <button type="submit">Send Message</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
