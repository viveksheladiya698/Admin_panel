import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addbranch = () => {

  const success = () => toast.success("Branch Added Successfully!");
  const error = () => toast.error("Something Went Wrong!");
  let send_data = async (values) => {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        authorization: token
      }
      let responce = await axios.post('http://localhost:4000/branch/branch', values, { headers });
      if (responce.data.status == 'branch is already Exist') {
        let exits = () => toast.error(responce.data.status);
        exits();
        handleReset();
      }
      else{
        success();
        handleReset();
      }
    }
    catch (err) {
      console.log(err);
      error();
    }
  }

  let chk = Yup.object({
    name: Yup.string().min(6, "Minimum 6 character Required").max(27, "It's To Long For Branch").required("Branch Must Be Required"),
  })

  let init = {
    name: "",
  }
  let { values, handleBlur, handleChange, handleSubmit, touched, errors, handleReset } = useFormik({
    initialValues: init,
    validationSchema: chk,
    onSubmit: values => {
      send_data(values);
    }
  })

  return (
    <>
      <div className="add-branch">
        <div className="d-flex justify-content-between align-items-center my-3 px-3">
          <h2 className='heading'>Add Branch</h2>
          <span className='home'><Link to={'/dashboard'}>Home</Link> / Add Branch</span>
        </div>
        <div className="branch-form">
          <Row className='justify-content-center mt-5'>
            <Col lg={4} className='rounded-4 shadow form' onSubmit={handleSubmit}>
              <div className="addbranch-form mt-2">
                <h3 className='form-heading text-center'>Add branch</h3>
              </div>
              <div className='mt-3'>
                <form action="" method='post' className='m-auto px-4'>
                  <table className='w-100'>
                    <tr>
                      <td>
                        <input type="text" name="name" placeholder='Branch Name' value={values.name} className='w-100 rounded my-2 px-2 py-2' onChange={handleChange} onBlur={handleBlur} />
                        {errors.name && touched.name ? <><span className='errors fw-'>{errors.name}</span></> : null}
                      </td>
                    </tr>
                    <tr>
                      <td className='text-center'><input type="submit" value="Add branch" className='my-2 px-4 py-2 rounded submit' /></td>
                    </tr>
                  </table>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <ToastContainer
        autoClose={1000}
      />
    </>
  )
}

export default Addbranch;