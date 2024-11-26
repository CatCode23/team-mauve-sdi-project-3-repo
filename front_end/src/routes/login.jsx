import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  // State Variables
  const [formData, setFromData] = useState( {username: '', password: ''} );
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  // Click Events
  const handleFormData = (event) => {
    setFromData( {...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let endpoint = login ? '/login' : '/register';
    let response = await fetch(`http://localhost:5001${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), credentials: 'include' })
      .then(response => !response.ok ? Promise.reject(new Error('Failed to POST Login/Registration Request')) : Promise.resolve(response.json()))
      .catch(error => { console.log(error.message)})
    let data = await response.json();
    console.log(data);
    navigate('/User-Profile');
  };

  return (
    <div>
      <h3>{login ? 'Login' : 'Register'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name ="username" value={formData.username} onChange={handleFormData} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleFormData} />
        </div>
        <button type="submit">{login ? 'Login' : 'Register'}</button>
      </form>
      <h4>
        <p>{login ? `Don't have an Account? ` : 'Already have an Account? '}</p>
        <button onClick={ () => setLogin(!login)}>{login ? 'Register' : 'Login'}</button>
      </h4>
    </div>
  )
};

export default Login;