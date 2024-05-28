import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStatus = () => {

    const success = () => toast.success("Status Added Successfully!");
    const error = () => toast.error("Something Went Wrong!");

    let send_data = async (values) => {
        try {
            let token = localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            let responce = await axios.post('http://localhost:4000/status/status', values, { headers });
            handleReset();
            if (responce.data.status == "status is already Exist") {
                const err = () => toast.error(responce.data.status);
                err();
            }
            else {
                success();
            }
        }
        catch (err) {
            console.log(err);
            error();
        }
    }

    let check = Yup.object({
        name: Yup.string().min(2, "Minimum 2 character Required").max(18, "It's To Long..!").required("Status Must Be Required"),
    });

    let init = {
        name: "",
    };

    let { values, handleBlur, handleChange, handleSubmit, errors, touched, handleReset } = useFormik({
        initialValues: init,
        validationSchema: check,
        onSubmit: values => {
            send_data(values);
        }
    })

    return (
        <>
            <div className="add-status">
                <div className="d-flex justify-content-between align-items-center my-3 px-3">
                    <h2 className='heading'>Add status</h2>
                    <span className='home'><Link to={'/dashboard'}>Home</Link> / Add status</span>
                </div>
                <div className="roll-form">
                    <Row className='justify-content-center mt-5'>
                        <Col lg={4} className='rounded-4 shadow form'>
                            <div className="addroll-form mt-2">
                                <h3 className='form-heading text-center'>Add status</h3>
                            </div>
                            <div className='mt-3'>
                                <form method='post' className='m-auto px-4' onSubmit={handleSubmit}>
                                    <table className='w-100'>
                                        <tr>
                                            <td>
                                                <input type="text" name="name" placeholder='status Name' value={values.name} className='w-100 rounded my-2 px-2 py-2' onChange={handleChange} onBlur={handleBlur} />
                                                {errors.name && touched.name ? <><br /><span className='errors'>{errors.name}</span></> : null}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'><input type="submit" value="Add status" className='my-2 px-4 py-2 rounded submit' /></td>
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

export default AddStatus