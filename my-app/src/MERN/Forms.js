import React, { useState } from 'react';
import './Form.css';
import axios from 'axios';

function Forms() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.username || !form.email || !form.password) {
      alert('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/register', form);
      alert(res.data.message);
      // Clear form after successful registration
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      console.error('Form submission error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Registration failed';
      alert('Error: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='container'>
      <div className='form-box'>
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={form.username}
            onChange={handleChange}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={form.password}
            onChange={handleChange}
          />
          <button type='submit' disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forms;
