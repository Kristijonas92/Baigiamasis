import UserContext from '../context/UserContext';
import { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import GreatPosts from '../img/GreatPosts.png'

const LogIn = () => {
    const [error, setError] = useState('');
    const { users } = useContext(UserContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        const user = users.find((u) => u.email === values.email && u.password === values.password);
        if (!user) {
            setError('Incorrect email or password');
            setSubmitting(false);
            return;
        }

        setSubmitting(false);
        navigate('/');
    };

    return (
        <>
            <header>
                <nav>
                    <Link to="/register">Register</Link>
                </nav>
            </header>
            <div className="logo">
                <img src={GreatPosts} alt="Logo" />
            </div>
            <div>
                <h1>LogIn</h1>
                {error && <p>{error}</p>}
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="email" name="email" placeholder="Email" />
                            <Field type="password" name="password" placeholder="Password" />
                            <button type="submit" disabled={isSubmitting}>
                                LogIn
                            </button>
                            <Link to="/register">Go to registration</Link>
                        </Form>
                    )}
                </Formik>
            </div>
            <footer>
                Copyright &copy; {new Date().getFullYear()}
            </footer>
        </>
    );
};

export default LogIn;
