import UserContext from '../context/UserContext';
import { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';


const Registration = () => {
    const [error, setError] = useState('');
    const { addUser } = useContext(UserContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        photo: Yup.string().url('Invalid URL').required('Photo URL is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        addUser(values)
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
            <h1>Registration</h1>
            {error && <p>{error}</p>}
            <Formik
                initialValues={{ name: '', email: '', password: '', photo: '', avatar: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="name" placeholder="Name" />
                        <Field type="email" name="email" placeholder="Email" />
                        <Field type="password" name="password" placeholder="Password" />
                        <Field type="text" name="photo" placeholder="Photo URL" />
                        <button type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                        <Link to="/">Cancel</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Registration;