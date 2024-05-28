import React, { useState } from 'react';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authchk } from '../../Store/CounterSlice/CounterReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';

const Login = () => {

  let dispatch = useDispatch();
  let [loader, setloader] = useState(false);

  let send_data = async (values) => {
    try {
      let responce = await axios.post('http://localhost:4000/auth/admin_login', values);
      let token = await responce.data.token;
      if (token !== undefined) {
        localStorage.setItem('token', token);
        dispatch(authchk())
        setloader(false)
      }
      else {
        const err = () => toast.error(responce.data.status);
        err();
        setloader(false)
      }
    } catch (error) {
      console.log(error)
      const err = () => toast.error(error.message);
      err();
      setloader(false)
    }
  }

  let validation = Yup.object({
    admin_email: Yup.string().email('Email should be in proper format').required('Email must be required..!'),
    admin_pass: Yup.string().min(6, 'Password should be have atleast 6 character').required('Password must be required..!')
  })

  let init = {
    admin_email: '',
    admin_pass: ''
  }

  let { values, handleBlur, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: init,
    validationSchema: validation,
    onSubmit: values => {
      setloader(true)
      send_data(values);
    }
  })

  return (
    <>
      <div className="login-body h-100 d-flex text-center">
        <div className="w-custom login w-100 pading rounded-3 shadow">
          <h3 className='fw-medium fs-3'>Admin Login</h3>
          <div className="login-form mt-4">
            <form method='post' onSubmit={handleSubmit}>
              <table className='w-100'>
                <tr>
                  <td>
                    <input type="text" name='admin_email' placeholder='Email' value={values.email} className='w-100 px-2 rounded-2 my-2' onChange={handleChange} onBlur={handleBlur} />
                    {errors.admin_email && touched.admin_email ? <><br></br><span className='errors'>{errors.admin_email}</span></> : null}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="password" name='admin_pass' placeholder='password' className='w-100 px-2 rounded-2 my-2' onChange={handleChange} onBlur={handleBlur} />
                    {errors.admin_pass && touched.admin_pass ? <><br /><span className='errors'>{errors.admin_pass}</span></> : null}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button role='submit' className='rounded'>
                      {
                        !loader ? ("Login") : (
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden load">Loading...</span>
                          </Spinner>
                        )
                      }
                    </button>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={1000}
      />
    </>
  )
}

export default Login;