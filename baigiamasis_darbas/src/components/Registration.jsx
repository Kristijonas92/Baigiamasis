import UserContext from '../context/UserContext';
import { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import GreatPosts from '../img/GreatPosts.png'

const Registration = () => {
    const [error, setError] = useState('');
    const { users, addUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        photo_url: ''
    })

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
        photo_url: Yup.string().url('Invalid URL').required('Photo URL is required'),
    });

    const handleChange = event => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        addUser(formValues.name, formValues.email, formValues.password, formValues.photo_url);

        // validationSchema
        //     .validate(formValues, { abortEarly: false })
        //     .then(validFormValues => {
        //         users(validFormValues)
        //             .then(() => {
        //                 navigate('/');
        //             })
        //             .catch((err) => {
        //                 setError(err.message);
        //             });
        //     })
        //     .catch(errors => {
        //         const validationErrors = {};
        //         errors.inner.forEach(error => {
        //             validationErrors[error.path] = error.message;
        //         });
        //         setErrors(validationErrors);
        //     });
    };

    const [errors, setErrors] = useState({});

    return (
        <div>
            <header>
                <nav>
                    <Link to="/register">Register</Link>
                    <Link to="/login">LogIn</Link>
                </nav>
                <img src={GreatPosts} alt="Logo" />
            </header>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formValues.name} onChange={handleChange} placeholder="Name" />
                {errors.name && <div>{errors.name}</div>}
                <input type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="Email" />
                {errors.email && <div>{errors.email}</div>}
                <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" />
                {errors.password && <div>{errors.password}</div>}
                <input type="password" name="passwordConfirm" value={formValues.passwordConfirm} onChange={handleChange} placeholder="Confirm Password" />
                {errors.passwordConfirm && <div>{errors.passwordConfirm}</div>}
                <input type="text" name="photo_url" value={formValues.photo_url} onChange={handleChange} placeholder="Photo URL" />
                {errors.photo_url && <div>{errors.photo_url}</div>}
                {error && <div>{error}</div>}
                <button type="submit">Register</button>
            </form>
            <footer>
                <p>Copyright &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default Registration