import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Viewuser = () => {

  let token = localStorage.getItem('token');
  let headers = {
    authorization: token
  }
  let [role, setrole] = useState([]);
  let [branch, setbranch] = useState([]);

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

  //  update model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // delete model
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  let [updateid, setupdateid] = useState(null);
  const Update = () => toast.success("User Updeted Successfully!");
  const Delete = () => toast.success("User Deleted Successfully!");
  const err = () => toast.error("Something Went Wrong!");

  let [user, setuser] = useState(null);
  let getdata = async () => {
    axios.get('http://localhost:4000/auth/view_admin', { headers })
      .then((response) => {
        setuser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        err()
      })
  }
  useEffect(() => {
    getdata();
  }, []);

  // delete user 

  let delete_User = async () => {
    handleClose1();
    try {
      let res = await axios.get(`http://localhost:4000/auth/admin_delete/${updateid}`, { headers });
      Delete();
      getdata();
    } catch (error) {
      error();
    }
    setupdateid(null);
  }

  // update user
  let update = async (values) => {
    try {
      let res = await axios.post(`http://localhost:4000/auth/admin_update/${updateid}`, values, { headers });
      handleClose();
      Update();
      getdata();
      setupdateid(null)
    } catch (error) {
      console.log(error);
      err();
    }
  }
  let chk = Yup.object({
    admin_name: Yup.string().min(2, "Too Short..!").max(25, "Too Long..!").required('Admin Name Must Be Required'),
    admin_email: Yup.string().required('Email Must Be Required'),
    contact: Yup.string().min(10, "Contact Should Have 10 Digits").max(10, "Contact No Should Have 10 Digits").required('Required'),
    role: Yup.string().required('Role Must Be Required'),
    branch: Yup.string().required('Branch Must Be Required')
  })
  let init = {
    admin_name: '',
    admin_email: '',
    contact: '',
    role: '',
    branch: ''
  }
  let { values, handleBlur, handleChange, handleReset, handleSubmit, errors, touched } = useFormik({
    initialValues: init,
    validationSchema: chk,
    onSubmit: values => {
      update(values);
    }
  })

  return (
    <>
      <div className="view-user">
        <div className="d-flex justify-content-between align-items-center my-3 px-3">
          <h2 className='heading'>View User</h2>
          <span className='home'><Link to={'/dashboard'}>Home</Link> / View User</span>
        </div>
        <Row className='justify-content-center mt-5'>
          <Col lg={8}>
            <div className="display-table rounded-3 shadow dispaly-padding">
              <h3 className='text-center form-heading'>All Users</h3>
              <table className='user-table w-100 mt-4 text-center'>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Branch Roll</th>
                  <th>Branch name</th>
                  <th>Action</th>
                </tr>
                {
                  user != null &&
                  user.map((ele, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>{ele.admin_name}</td>
                        <td>{ele.admin_email}</td>
                        <td>{ele.contact}</td>
                        <td>{ele.role?.name}</td>
                        <td>{ele.branch?.name}</td>
                        <td className='text-center'>
                          <span className='edit-btn'>
                            <Button onClick={() => {
                              values.admin_email = ele.admin_email
                              values.admin_name = ele.admin_name
                              values.contact = ele.contact

                              handleShow();
                              setupdateid(ele._id);
                            }} className='me-2'>
                              <FaRegEdit className='edit position' />
                            </Button>
                            <RiDeleteBin6Line className='delete' onClick={() => {
                              setupdateid(ele._id)
                              handleShow1();
                            }} />
                          </span>
                        </td>
                      </tr>
                    )
                  })
                }
              </table>
            </div>
          </Col>
        </Row>
        {/* update user Model */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form method="post" className='form' onSubmit={handleSubmit}>
              <table className='w-100'>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name='admin_name' value={values.admin_name} placeholder='Enter Name' className='w-100 rounded my-1 px-2 py-2' onChange={handleChange} onBlur={handleBlur} />
                    {errors.admin_name && touched.admin_name ? <><br /><span className='errors'>{errors.admin_name}</span></> : null}
                  </td>
                  <td>
                    <input type="text" name='admin_email' value={values.admin_email} placeholder='Enter Email' className='w-100 rounded my-1 px-2 py-2' onChange={handleChange} onBlur={handleBlur} />
                    {errors.admin_email && touched.admin_email ? <><br /><span className='errors'>{errors.admin_email}</span></> : null}
                  </td>
                </tr>
                <tr>
                  <td>Contact</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <input type="text" name='contact' value={values.contact} placeholder='Enter Contact No' className='w-100 rounded my-1 px-2 py-2' onBlur={handleBlur} onChange={handleChange} />
                    {errors.contact && touched.contact ? <><br /><span className='errors'>{errors.contact}</span></> : null}
                  </td>
                </tr>
                <tr>
                  <td>Branch Role</td>
                  <td>Branch Name</td>
                </tr>
                <tr>
                  <td>
                    <select name="role" className='w-100 rounded my-1 px-2 py-2' onChange={handleChange} onBlur={handleBlur}>
                      <option value="">Choose...</option>
                      {
                        role != null &&
                        role.map((ele, ind) => {
                          return (
                            <option key={ind} value={ele._id}>{ele.name}</option>
                          )
                        })
                      }
                    </select>
                    {errors.role && touched.role ? <><br /><span className='errors'>{errors.role}</span></> : null}
                  </td>
                  <td>
                    <select name="branch" className='w-100 rounded my-1 px-2 py-2' onBlur={handleBlur} onChange={handleChange}>
                      <option value="">Choose...</option>
                      {
                        branch != null &&
                        branch.map((ele, ind) => {
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
                  <td className='text-center' colSpan={2}>
                    <input type="submit" value="Add Changes" className='submit my-2 px-4 py-2 rounded' />
                  </td>
                </tr>
              </table>
            </form>
          </Modal.Body>
        </Modal>
        {/* delete model */}
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body><span className='danger'>Are You Sure Want to Delete This User..!</span></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              CLOSE
            </Button>
            <Button variant="danger" onClick={()=>{
              delete_User();
            }}>
              DELETE
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer
        autoClose={1000}
      />
    </>
  )
}

export default Viewuser