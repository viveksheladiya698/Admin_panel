import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addreferance = () => {
    const success = () => toast.success("Referance Added Successfully!");
    const error = () => toast.error("Something Went Wrong!");

    let send_data = async (values) => {
        let token = await localStorage.getItem('token');
        let headers = {
            authorization: token
        }
        let responce = await axios.post('http://localhost:4000/ref/reference', values, { headers });
        if (responce.data.status == 'reference is already Exist') {
            let exits = () => toast.error(responce.data.status);
            exits();
            handleReset();
        } else if (responce.data.status == 'reference Insert') {
            success();
            handleReset();
        }
        else {
            error();
            handleReset();
        }
    }
    let chk = yup.object({
        name: yup.string().min(2, "Minimun 2 Character require").max(15, "It's To Long..!").required("Referance Name Must Be Required"),
    })
    let init = {
        name: ''
    }
    let { handleBlur, handleChange, handleReset, handleSubmit, touched, errors, values } = useFormik({
        initialValues: init,
        validationSchema: chk,
        onSubmit: values => {
            send_data(values);
        }
    })
    return (
        <>
            <div className="add-referance">
                <div className="d-flex justify-content-between align-items-center my-3 px-3">
                    <h2 className='heading'>Add Referance</h2>
                    <span className='home'><Link to={'/dashboard'}>Home</Link> / Add referance</span>
                </div>
                <div className="referance-form">
                    <Row className='justify-content-center mt-5'>
                        <Col lg={4} className='rounded-4 shadow form'>
                            <div className="addreferance-form mt-2">
                                <h3 className='form-heading text-center'>Add Referance</h3>
                            </div>
                            <div className='mt-3'>
                                <form method='post' className='m-auto px-4' onSubmit={handleSubmit}>
                                    <table className='w-100'>
                                        <tr>
                                            <td>
                                                <input type="text" name="name" value={values.name} placeholder='Referance' className='w-100 rounded my-2 px-2 py-2' onBlur={handleBlur} onChange={handleChange} />
                                                {errors.name && touched.name ? <><br /><span className='errors'>{errors.name}</span></> : null}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'><input type="submit" value="Add Referance" className='my-2 px-4 py-2 rounded submit' /></td>
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

export default Addreferance