import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function Register() {
    const redirect = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState('');
    const credentials = { name, email, password, password_confirmation };


    const store = async e => {
        e.preventDefault();

        try {
            let response = await axios.post('register', credentials);

            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            redirect.push('/login');
            toast.success(response.data.message + " Please login");
        } catch(err) {
            setErrors(err.response.data.errors);
            setMessage(err.response.data.message);
        }
    }

    return (
        <div className="container py-2">
            <div className="row">
                <div className="col-xl-5 col-sm-4 mx-auto">
                    {
                        message ? <div className="alert-danger">{ message}</div> : ''
                    }
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h4 className="text-center">Register</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={store}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name="name" id="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} onChange={e => setName(e.target.value)} value={name}/>
                                    {
                                        errors.name ? <div className="text-danger mt-2">{errors.name[0]}</div> : ""
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} onChange={e => setEmail(e.target.value)} value={email}/>
                                    {
                                        errors.email ? <div className="text-danger mt-2">{errors.email[0]}</div> : ""
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} onChange={e => setPassword(e.target.value)} value={password}/>
                                    {
                                        errors.password ? <div className="text-danger mt-2">{errors.password[0]}</div> : ""
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                                    <input type="password" name="password_confirmation" id="password_confirmation" className={`form-control ${errors.password ? 'is-invalid' : ''}`} onChange={e => setPasswordConfirmation(e.target.value)} value={password_confirmation}/>
                                    {
                                        errors.password ? <div className="text-danger mt-2">{errors.password[0]}</div> : ""
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;