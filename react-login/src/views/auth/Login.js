import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticated } from '../../store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function Login() {

    const [auth, setAuth] = useRecoilState(authenticated);
    const redirect = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const credentials = {email, password};

    const handleLogin = async e => {
        e.preventDefault();

        try {
            let response = await axios.post('login', credentials);
            localStorage.setItem('user-token', response.data.token);
            redirect.push('/');
            setAuth({
                check: true,
                user: response.data.data,
            });
            toast.success(`Hello, ${response.data.data.name}`);
        } catch(err) {
            setErrors(err.response.data.errors);
        }
    }

    return (
        <div className="container py-2">
            <div className="row">
                <div className="col-xl-5 col-sm-4 mx-auto">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h4 className="text-center">Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} onChange={e => setEmail(e.target.value)} value={email} />
                                    {
                                        errors.email ? <div className="text-danger mt-2">{errors.email[0]}</div> : ''
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} onChange={e => setPassword(e.target.value)} value={password} />
                                    {
                                        errors.password ? <div className="text-danger mt-2">{errors.password}</div> : ''
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;