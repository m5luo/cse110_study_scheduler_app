import React, { useState } from 'react';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset email sent to:', email);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Forgot Password</h2>
        <p style={styles.description}>
          If you have an account registered, you will receive an email with instructions on how to reset your password.
        </p>
        <label style={styles.label} htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          style={styles.input}
        />
        <button type="submit" style={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;

const styles = {
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

  heading: {
    fontSize: '112px',
    fontWeight: 'bold',
    marginBottom: '96px',
    marginTop: '-320px',
  },

  //"you will receive an email" label
  description: {
    fontSize: '48px',
    color: '#666',
    marginBottom: '10x',
  },

  //email label
  label: {
    display: 'block',
    marginLeft: '-175px',
    fontSize: '56px',
    color: '#333',
    textAlign: 'left' as 'left',
    marginBottom: '0.5rem',
  },

  //"enter your email" input box
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

  //send button
  sendButton: {
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
};
