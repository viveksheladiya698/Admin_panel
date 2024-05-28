import React from 'react';
import './component.css';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Course = () => {

  const success = () => toast.success("Course Added Successfully!");
  const err = () => toast.error("Something Went Wrong!");
  let send_data = async (values) => {
    try {
      let token = await localStorage.getItem('token');
      let headers = {
        authorization: token
      }
      let responce = await axios.post('http://localhost:4000/course/course', values, { headers });
      if (responce.data.status == 'course is already Exist') 
      {
        let Exist = () => toast.error(responce.data.status)
        handleReset();
        Exist();
      }
      else{
        handleReset();
        success();
      }
    } catch (error) {
      err();
    }
  }

  let chk = Yup.object({
    name: Yup.string().min(2, "Minimum 2 character Required").max(25, "It's To Long").required("Course Must Be Required"),
  })

  let init = {
    name: ''
  }
  let { handleBlur, handleChange, handleSubmit, values, errors, touched, handleReset } = useFormik({
    initialValues: init,
    validationSchema: chk,
    onSubmit: values => {
      send_data(values);
    }
  })

  return (
    <>
      <div className="add-Course h-100">
        <div className="d-flex justify-content-between align-items-center my-3 px-3">
          <h2 className='heading'>Add Course</h2>
          <span className='home'><Link to={'/dashboard'}>Home</Link> / Add Course</span>
        </div>
        <Row className='justify-content-center mt-5'>
          <Col lg={4} className='rounded-4 shadow form'>
            <div className="add-course mt-2">
              <h3 className='text-center form-heading'>Add Course</h3>
            </div>
            <div className='mt-3'>
              <form action="" method='post' className='m-auto px-4' onSubmit={handleSubmit}>
                <table className='w-100'>
                  <tr>
                    <td>
                      <input type="text" name="name" placeholder='Course Name' value={values.name} className='w-100 rounded my-2 px-2 py-2' onChange={handleChange} onBlur={handleBlur} />
                      {errors.name && touched.name ? <><span className='errors'>{errors.name}</span></> : null}
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center'><input type="submit" value="Add Course" className='my-2 px-4 py-2 rounded submit' /></td>
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

export default Course