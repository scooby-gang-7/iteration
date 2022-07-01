import React from "react";
import '../stylesheets/styles.css'

function Login() {
  return (
    <div id="login-parent">
      <form action='#' method= 'post' onSubmit={console.log('hello')}>
        <h3>Login</h3>
        <div className=''>
          <label>Username:  </label>
          <input type='text' placeholder='username' name='username' />
        </div>
        <div className=''>
          <label>Password:  </label>
          <input type='password' placeholder='password' name='password'/>
        </div>
        <button className=''>Submit</button>
      </form>
      <br />
      <button className='' >Sign In</button>
    </div>
  )
};

export default Login;