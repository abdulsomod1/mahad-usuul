import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields: name, email, or message' });
      }
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json({ message: 'Contact saved successfully', data });
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
