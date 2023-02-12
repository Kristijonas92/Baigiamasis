import UserContext from '../context/UserContext';
import { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import GreatPosts from '../img/GreatPosts.png'

const Registration = () => {
    const [error, setError] = useState('');
    const { users } = useContext(UserContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
        photo: Yup.string().url('Invalid URL').required('Photo URL is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        users(values)
            .then(() => {
                setSubmitting(false);
                navigate('/');
            })
            .catch((err) => {
                setError(err.message);
                setSubmitting(false);
            });
    };

    return (
        <div>
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </nav>
                <img src={GreatPosts} alt="Logo" />
            </header>
            <h1>Registration</h1>
            {error && <p>{error}</p>}
            <Formik
                initialValues={{ name: '',
                email: '',
                password: '',
                passwordConfirm: '',
                photo_url: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                
                    <Form >
                        <Field type="text" name="name" placeholder="Name" />
                        <Field type="email" name="email" placeholder="Email" />
                        <Field type="password" name="password" placeholder="Password" />
                        <Field type="password" name="passwordConfirm" placeholder="Confirm Password" />
                        <Field type="text" name="photo_url" placeholder="Photo URL" />
                        <button type="submit">
                            Register
                        </button>
                        <Link to="/login">Cancel</Link>
                    </Form>
            </Formik>

            <footer>
                <p>Copyright &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default Registration;