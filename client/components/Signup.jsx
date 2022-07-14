import React, { useState } from 'react';
import '../stylesheets/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Signup({ setUserInfo, userInfo }) {
  const [name_first, setFirstName] = useState('');
  const [name_last, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    fetch('auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name_first,
        name_last,
        email,
        password,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setUserInfo(data);
        window.localStorage.setItem(
          'session_id',
          JSON.stringify(data.session_id)
        );
        toast.success('Signup successful!');
        navigate('/mytrips', { replace: true });
        console.log('FRONTEND DATA -->', data);
      })
      .catch((e) => {
        //pop-up error handling instance
        toast.error('Signup unsuccessful');
        console.log({ e });
      });
  };

  return (
    <div id='signup-parent'>
      <h1>Travel Pal</h1>
      <form action='#'>
        <h3>Sign Up</h3>
        <div>
          <label>First Name: </label>
          <input
            type='text'
            placeholder='first name'
            name='name_first'
            value={name_first}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type='text'
            placeholder='last name'
            name='name_last'
            value={name_last}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email Address: </label>
          <input
            type='text'
            placeholder='email address'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type='password'
            placeholder='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button className='' onClick={handleSubmitSignup}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
