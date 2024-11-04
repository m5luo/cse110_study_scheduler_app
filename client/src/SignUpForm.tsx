import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your sign-up logic here
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create an Account</h2>
        <div style={styles.nameContainer}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.nameInput}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={styles.nameInput}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.submitButton}>
          Sign Up
        </button>
        <button
          type="button"
          style={styles.link}
          onClick={() => navigate('/')} // Navigate to Sign In page
        >
          Already have an account? Sign in!
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

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

  //"Create an account" heading
  heading: {
    fontSize: '112px',
    fontWeight: 'bold',
    marginBottom: '96px',
    marginTop: '-448px',
  },

  //first and last name input boxes
  nameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '320px',
    marginBottom: '56px',
  },

  nameInput: {
    width: '600px',
    padding: '64px',
    marginLeft: '-250px',
    borderRadius: '50px',
    border: '1px solid #ccc',
    fontSize: '56px',
    display: 'block' 
  },

  //email, password, and confirm password input fields
  input: {
    width: '135%',
    padding: '88px',
    marginBottom: '56px',
    marginLeft: '-250px',
    borderRadius: '50px',
    border: '1px solid #ccc',
    fontSize: '56px',
  },

  //"sign up" button
  submitButton: {
    width: '1550px',
    padding: '64px',
    marginLeft: '-250px',
    borderRadius: '100px',
    border: 'none',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '40px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  //"Already have an account?" button
  link: {
    display: 'block',
    marginTop: '40px',
    marginLeft: '-250px',
    fontSize: '48px',
    textDecoration: 'underline',
    color: '#555',
  },
};
