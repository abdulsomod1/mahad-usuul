import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Save contact form submission
    const { name, email, message } = req.body;
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ message: 'Contact saved successfully', data });
  } else if (req.method === 'GET') {
    // Get all contact messages
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
