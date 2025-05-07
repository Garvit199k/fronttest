const users = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { action, username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (action === 'register') {
      const userExists = users.find(user => user.username === username);
      if (userExists) {
        return res.status(409).json({ error: 'User already exists' });
      }
      users.push({ username, password });
      return res.status(201).json({ message: 'User registered successfully' });
    }

    if (action === 'login') {
      const user = users.find(user => user.username === username && user.password === password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      return res.status(200).json({ message: 'Login successful' });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
