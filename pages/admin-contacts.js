import { useEffect, useState } from 'react';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contacts');
        if (!res.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Admin Dashboard - Contact Messages</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ id, name, email, message, created_at }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{message}</td>
              <td>{new Date(created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
