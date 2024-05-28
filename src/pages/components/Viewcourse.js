import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

export const Viewcourse = () => {

    const Update = () => toast.success("Course Updeted Successfully!");
    const Delete = () => toast.success("Course Deleted Successfully!");
    const err = () => toast.error("Something Went Wrong!")

    // Update Course
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Delete Course
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    let [course, setcourse] = useState([]);
    let [updateid, setupdateid] = useState(null);

    let token = localStorage.getItem('token');
    let headers = {
        authorization: token
    }
    let getdata = async () => {
        axios.get('http://localhost:4000/course/view_course', { headers })
            .then((response) => {
                setcourse(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                err();
            })
    }
    let delete_course = async () => {
        try {
            let res = await axios.get(`http://localhost:4000/course/course_delete/${updateid}`, { headers });
            handleClose1();
            getdata();
            setupdateid(null)
            Delete();
        } catch (error) {
            err();
        }
    }

    let update = async (values) => {
        try {
            let res = await axios.post(`http://localhost:4000/course/course_update/${updateid}`, values, { headers });
            setupdateid(null);
            if (res.data.status == 'course is already Exist') {
                const err = () => toast.error(res.data.status);
                err()
                handleClose();
                handleReset();
            }
            else {
                handleClose();
                handleReset();
                Update();
                getdata();
            }
        } catch (error) {
            error();
        }
    }
    let check = Yup.object({
        name: Yup.string().min(2, "Minimum 2 character Required").max(30, "It's To Long For Course").required("Course Must Be Required"),
    });
    let init = {
        name: ''
    }
    let { values, handleBlur, handleChange, handleReset, handleSubmit, errors, touched } = useFormik({
        initialValues: init,
        validationSchema: check,
        onSubmit: values => {
            update(values);
        }
    })
    useEffect(() => {
        getdata();
    }, []);
    return (
        <>
            <div className="view-course">
                <div className="d-flex justify-content-between align-items-center my-3 px-3">
                    <h2 className='heading'>View Course</h2>
                    <span className='home'><Link to={'/dashboard'}>Home</Link> / View Course</span>
                </div>
                <Row className='justify-content-center mt-5'>
                    <Col lg={5}>
                        <div className="display-table rounded-3 shadow dispaly-padding">
                            <h3 className='text-center form-heading'>All Course</h3>
                            <table className='w-100 mt-4'>
                                <tr>
                                    <th>#</th>
                                    <th>Course Name</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                                {
                                    course.map((ele, ind) => {
                                        return (
                                            <tr key={ind}>
                                                <td>{ind + 1}</td>
                                                <td>{ele.name}</td>
                                                <td className='text-center'>
                                                    <span className='edit-btn'>
                                                        <Button onClick={() => {
                                                            handleShow();
                                                            setupdateid(ele._id)
                                                            values.name = ele.name
                                                        }} className='me-2'>
                                                            <FaRegEdit className='edit position' />
                                                        </Button>
                                                        <RiDeleteBin6Line className='delete' onClick={() => {
                                                            handleShow1()
                                                            setupdateid(ele._id)
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
                {/* Update Course Model */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method='post' className='m-auto px-4' onSubmit={handleSubmit}>
                            <table className='w-100'>
                                <tr>
                                    <td>
                                        <input type="text" name="name" placeholder='Course Name' value={values.name} className='w-100 rounded my-2 px-2 py-2' onChange={handleChange} onBlur={handleBlur} />
                                        {errors.name && touched.name ? <><br /><span className='errors'>{errors.name}</span></> : null}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-center'><input type="submit" value="Add Course" className='my-2 px-4 py-2 rounded submit' onClick={handleClose} /></td>
                                </tr>
                            </table>
                        </form>
                    </Modal.Body>
                </Modal>
                {/* Delete Course Model */}
                <Modal show={show1} onHide={handleClose1}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><span className='danger'>Are You Sure Want to Delete This Course..!</span></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose1}>
                            CLOSE
                        </Button>
                        <Button variant="danger" onClick={() => {
                            delete_course();
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
export default Viewcourse