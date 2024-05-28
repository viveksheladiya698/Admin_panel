import React, { useEffect, useState } from 'react';
import './component.css'
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {

  let token = localStorage.getItem('token');
  let headers = {
    authorization: token
  }
  const error = () => toast.error("Something Went Wrong!")
  const success = () => toast.success("User Added Successfully!")

  let [role, setrole] = useState([]);
  let [Branch, setbranch] = useState([]);
  let [Image, setimage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/branch/view_branch', { headers: headers }).then((res) => {
      setbranch(res.data.data);
    }).catch((err) => {
      console.log(err);
    })
    axios.get('http://localhost:4000/role/view_role', { headers: headers }).then((res) => {
      setrole(res.data.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  let chk = Yup.object({
    admin_name: Yup.string().min(3, "Too short..!").max(15, "Too Long..!").required('Name Must Be Required'),
    admin_email: Yup.string().email('Invalid email').required('Email Must Be Required'),
    admin_pass: Yup.string().min(6, "To Short..!").max(18, "To Long..!").required('Password Must Be Required'),
    role: Yup.string().required('Role Must Be Required'),
    branch: Yup.string().required('Branch Must Be Required'),
    contact: Yup.string().min(10, "moblie num must be 10 digit").max(10, "moblie num must be 10 digit").required('Contact Must Be Required'),
    image: Yup.mixed().required('Image Must Be Required')
  })

  let init = {
    admin_name: '',
    admin_email: '',
    admin_pass: '',
    role: '',
    branch: '',
    contact: '',
    image: ''
  }
  let formik = useFormik({
    initialValues: init,
    validationSchema: chk,
    onSubmit: values => {
      send_data(values);
    }
  })
  let { handleBlur, handleChange, handleReset, handleSubmit, errors, values, touched } = formik

  let send_data = async (values) => {
    let formdata = new FormData();
    formdata.append('admin_name', values.admin_name);
    formdata.append('admin_email', values.admin_email);
    formdata.append('admin_pass', values.admin_pass);
    formdata.append('role', values.role);
    formdata.append('branch', values.branch);
    formdata.append('contact', values.contact);
    formdata.append('image', Image);
    try {
      let responce = await axios.post('http://localhost:4000/auth/register', formdata, { headers });
      handleReset();
      success();
    }
    catch (err) {
      console.log(err);
      error();
    }
  }

  let fileHangler = (e) => {
    let image = e.currentTarget.files[0];
    setimage(image);
    formik.setFieldValue("image", image);
  }

  return (
    <>
      <div className="add-user">
        <div className="d-flex justify-content-between align-items-center my-3 px-3">
          <h2 className='heading'>Add User</h2>
          <span className='home'><Link to={'/dashboard'}>Home</Link> / Add User</span>
        </div>
        <Row className='justify-content-center mt-5'>
          <Col lg={8} className='rounded-4 shadow form'>
            <div className="add-user-form mt-2">
              <h3 className='text-center form-heading'>Add User</h3>
            </div>
            <div className='mt-3'>
              <form method='post' className='m-auto px-4 user_form' onSubmit={handleSubmit}>
                <table className='w-100'>
                  <tr>
                    <td colSpan={2}>
                      <input type="text" name="admin_name" value={values.admin_name} placeholder='Name' className='w-100 rounded my-2 px-2 py-2' onBlur={handleBlur} onChange={handleChange} />
                      {errors.admin_name && touched.admin_name ? <><br /><span className='errors'>{errors.admin_name}</span></> : null}
                    </td>
                  </tr>
                  <tr>
                    <td className='w-50'>
                      <input type="text" name="admin_email" value={values.admin_email} placeholder='Email' className='w-100 rounded my-2 px-2 py-2' onBlur={handleBlur} onChange={handleChange} />
                      {errors.admin_email && touched.admin_email ? <><br /><span className='errors'>{errors.admin_email}</span></> : null}
                    </td>
                    <td className='w-50'>
                      <input type="password" name="admin_pass" value={values.admin_pass} placeholder='Password' className='w-100 rounded my-2 px-2 py-2' onBlur={handleBlur} onChange={handleChange} />
                      {errors.admin_pass && touched.admin_pass ? <><br /><span className='errors'>{errors.admin_pass}</span></> : null}
                    </td>
                  </tr>
                  <tr>
                    <td className='w-50'>
                      <input type="file" name="image" className='w-100 rounded my-2 px-2 py-1' onBlur={handleBlur} onChange={(e) => { fileHangler(e) }} />
                      {errors.image && touched.image ? <><br /><span className='errors'>{errors.image}</span></> : null}
                    </td>
                    <td className='w-50'>
                      <input type="text" name='contact' value={values.contact} placeholder='Contact' className='w-100 rounded my-2 px-2 py-2' onBlur={handleBlur} onChange={handleChange} />
                      {errors.contact && touched.contact ? <><br /><span className='errors'>{errors.contact}</span></> : null}
                    </td>
                  </tr>
                  <tr>
                    <td className='w-50'>
                      <select name="role" value={values.role} className='w-100 rounded my-2 px-2 py-2' onBlur={handleBlur} onChange={handleChange}>
                        <option>Branch Roll</option>
                        {
                          role.map((ele, ind) => {
                            return (
                              <option key={ind} value={ele._id}>{ele.name}</option>
                            )
                          })
                        }
                      </select>
                      {errors.role && touched.role ? <><br /><span className='errors'>{errors.role}</span></> : null}
                    </td>
                    <td className='w-50'>
                      <select name="branch" value={values.branch} className='w-100 rounded my-2 px-2 py-2' onBlur={handleBlur} onChange={handleChange}>
                        <option>Branch</option>
                        {
                          Branch.map((ele, ind) => {
                            return (
                              <option key={ind} value={ele._id}>{ele.name}</option>
                            )
                          })
                        }
                      </select>
                      {errors.branch && touched.branch ? <><br /><span className='errors'>{errors.branch}</span></> : null}
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center' colSpan={2}><input type="submit" value="Add User" className='my-2 px-4 py-2 rounded submit' /></td>
                  </tr>
                </table>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer
        autoClose={1000}
      />
    </>
  )
}

export default User;