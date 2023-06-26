import React, { useState } from 'react';
import axios,{ AxiosResponse } from 'axios';
import { TextField, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';


const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  const response: AxiosResponse = await axios.get('/api/loginapi', {
    params: { username, password },
  });

    try {
      // get data from server
      await axios.get('/api/loginapi', {
        params: { username, password },
      });

      // Clear the form
      setUsername('');
      setPassword('');

      // Do something after successful submission
      // e.g., redirect to a different page
      if (response.data.message === 'Success') {
        // Clear the form
        setUsername('');
        setPassword('');
        router.push('/');
        // Do something after successful login
        // e.g., redirect to a different page
      } else {
        // Handle unsuccessful login
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
};

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div>
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <Button type="submit" variant="contained">Submit</Button>
    <Button variant="contained" ><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href={"/signup"}>Sign Up</Link></Button>
  </form>
  );
};

export default LoginForm;