import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const View_status = () => {

    const Update = () => toast.success("Status Updeted Successfully!");
    const Delete = () => toast.success("Status Deleted Successfully!");
    const err = () => toast.error("Something Went Wrong!");

    // Update Status 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Delete Status
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    let [status, setstatus] = useState([]);
    let [updateid, setupdateid] = useState(null);
    let token = localStorage.getItem('token');
    let headers = {
        authorization: token
    }
    let getdata = async () => {
        axios.get('http://localhost:4000/status/view_status', { headers })
            .then((response) => {
                setstatus(response.data.data);
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error);
                err();
            })
    }
    let delete_status = async () => {
        try {
            let res = await axios.get(`http://localhost:4000/status/status_delete/${updateid}`, { headers });
            setupdateid(null)
            handleClose1();
            getdata();
            Delete();
        } catch (error) {
            error();
        }
    }
    useEffect(() => {
        getdata();
    }, []);

    // update role 

    let update = async (values) => {
        try {
            let res = await axios.post(`http://localhost:4000/status/status_update/${updateid}`, values, { headers });
            setupdateid(null);
            handleClose();
            handleReset();
            if (res.data.status == "role is already Exist") {
                const err = () => toast.error(res.data.status);
                err();
            }
            else {
                Update();
            }
            getdata();
        } catch (error) {
            error();
        }
    }
    let check = Yup.object({
        name: Yup.string().min(2, "Minimum 2 character Required..!").max(18, "It's To Long..!").required("Status Must Be Required..!"),
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

    return (
        <>
            <div className="view-roll">
                <div className="d-flex justify-content-between align-items-center my-3 px-3">
                    <h2 className='heading'>View Status</h2>
                    <span className='home'><Link to={'/dashboard'}>Home</Link> / View Status</span>
                </div>
                <div className="dispaly">
                    <Row className='justify-content-center mt-5'>
                        <Col lg={5}>
                            <div className="display-table rounded-3 shadow dispaly-padding">
                                <h3 className='text-center form-heading'>All Status</h3>
                                <table className='w-100 mt-4'>
                                    <tr>
                                        <th> Id </th>
                                        <th>Status Name</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                    {
                                        status.map((ele, ind) => {
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
                    {/* Update Status */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Status</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form method='post' className='m-auto px-4' onSubmit={handleSubmit}>
                                <table className='w-100'>
                                    <tr>
                                        <td>
                                            <input type="text" name="name" placeholder='Status Name' value={values.name} className='w-100 rounded my-2 px-2 py-2' onChange={handleChange} onBlur={handleBlur} />
                                            {errors.name && touched.name ? <><br /><span className='errors'>{errors.name}</span></> : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'><input type="submit" value="Add Roll" className='my-2 px-4 py-2 rounded submit' onClick={handleClose} /></td>
                                    </tr>
                                </table>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Delete Status */}
                    <Modal show={show1} onHide={handleClose1}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Status</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><span className='danger'>Are You Sure Want to Delete This Status..!</span></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose1}>
                                CLOSE
                            </Button>
                            <Button variant="danger" onClick={() => {
                                delete_status();
                            }}>
                                DELETE
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <ToastContainer
                autoClose={1000}
            />
        </>
    )
}

export default View_status