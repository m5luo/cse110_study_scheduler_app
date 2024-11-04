import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Sign in</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          style={styles.input}
        />
        <div style={styles.linkContainer}>
          <button
            type="button"
            style={styles.link}
            onClick={() => navigate('/forgot-password')} // Navigate to Forgot Password page
          >
            Forgot your password?
          </button>
        </div>
        <button type="submit" style={styles.loginButton}>
          Log in
        </button>
        <button
          type="button"
          style={styles.createAccountButton}
          onClick={() => navigate('/signup')}
        >
          Create an account
        </button>
      </form>
    </div>
  );
};

export default SignInForm;

const styles = {
  //background
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundImage: 'linear-gradient(#a2afc2, #d6d0db, #a2afc2)',
    margin: 0,
    padding: 0,
  },

  //white box
  form: {
    backgroundColor: '#fff',
    padding: '544px',
    borderRadius: '80px',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '1000px',
    maxHeight: '1000px',
    textAlign: 'center' as 'center',
  },

  //"sign in" text
  heading: {
    fontSize: '112px',
    fontWeight: 'bold',
    marginBottom: '96px',
    marginTop: '-320px',
  },

  //email and password input boxes
  input: {
    width: '1200px',
    padding: '96px',
    margin: '48px 0',
    marginLeft: '-200px',
    borderRadius: '48px',
    border: '1px solid #ccc',
    fontSize: '56px',
    display: 'block',
  },

  linkContainer: {
    textAlign: 'left' as 'left',
    marginBottom: '32px',
  },

  //"forgot your password?" button
  link: {
    textDecoration: 'underline',
    color: '#555',
    marginLeft: '-200px',
    fontSize: '48px',
  },

  //"Log in" button
  loginButton: {
    width: '140%',
    padding: '36px',
    marginTop: '80px',
    marginLeft: '-200px',
    borderRadius: '80px',
    border: 'none',
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '64px',
    display: 'block'
  },

  //"Create an account" button
  createAccountButton: {
    width: '180%',
    padding: '48px', 
    marginTop: '450px', 
    marginLeft: '-400px',
    borderRadius: '100px', 
    border: '1px solid #000',
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '64px',
    display: 'block' 
  },
};


