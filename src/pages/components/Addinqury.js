import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './component.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInquiry = () => {

    const success = () => toast.success("Inqury Added Successfully!");
    const err = () => toast.error("Something Went Wrong!");
    const [user, setUser] = useState([]);
    const [branch, setBranch] = useState([]);
    const [ref, setRef] = useState([]);
    const [status, setStatus] = useState([]);

    const token = localStorage.getItem('token');
    const headers = {
        authorization: token
    };

    const getData = async () => {
        try {
            const branchRes = await axios.get('http://localhost:4000/branch/view_branch', { headers });
            setBranch(branchRes.data.data);

            const refRes = await axios.get('http://localhost:4000/ref/view_reference', { headers });
            setRef(refRes.data.data);

            const userRes = await axios.get('http://localhost:4000/auth/view_admin', { headers });
            setUser(userRes.data.data);

            const statusres = await axios.get('http://localhost:4000/status/view_status', { headers })
            setStatus(statusres.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email").required("Email is required"),
        name: Yup.string().min(3, "It's too short").max(30, "It's too long").required("Name is required"),
        contact: Yup.string().min(10, "It's too short").max(10, "It's too long").required("Contact is required"),
        reference: Yup.string().required("Reference is required"),
        branch: Yup.string().required("Branch is required"),
        ref_by: Yup.string().required("Referred By is required"),
        joindate: Yup.string().required("Join Date is required"),
        inquiry_by: Yup.string().required("Inquiry By is required"),
        inquiry_date: Yup.string().required("Inquiry Date is required"),
        status: Yup.string().required("Status is required"),
        status_date: Yup.string().required("Status Date is required")
    });

    const initialValues = {
        email: "",
        name: "",
        contact: "",
        reference: "",
        branch: "",
        ref_by: "",
        joindate: "",
        inquiry_by: "",
        inquiry_date: "",
        status: "",
        status_date: ""
    };

    const { values, handleBlur, handleChange, handleReset, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post('http://localhost:4000/inquiry/inquiry', values, { headers });
                success();
                handleReset()
            } catch (err) {
                console.log(err);
                err();
            }
        }
    });

    return (
        <div className="add-inquiry">
            <div className="d-flex justify-content-between align-items-center my-3 px-3">
                <h2 className="heading">Add Inquiry</h2>
                <span className="home"><Link to="/dashboard">Home</Link> / Add Inquiry</span>
            </div>
            <Row className="justify-content-center mt-5">
                <Col lg={8} className="rounded-4 shadow form">
                    <div className="add-user-form mt-2">
                        <h3 className="text-center form-heading">Add Inqury</h3>
                    </div>
                    <div className="mt-3">
                        <form method="post" className="m-auto px-4 inquiry_form" onSubmit={handleSubmit}>
                            <table className="w-100">
                                <tbody>
                                    <tr>
                                        <td className="tr">Email</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <input type="text" name="email" value={values.email} placeholder="Enter Your Email" className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                                            {errors.email && touched.email && <><br /><span className='errors'>{errors.email}</span></>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tr">Name</td>
                                        <td className="tr">Contact</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="name" placeholder="Enter Your Name" value={values.name} className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                                            {errors.name && touched.name && <><br /><span className='errors'>{errors.name}</span></>}
                                        </td>
                                        <td>
                                            <input type="text" name="contact" placeholder="Enter Contact Number" value={values.contact} className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                                            {errors.contact && touched.contact && <><br /><span className='errors'>{errors.contact}</span></>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tr">Reference</td>
                                        <td className="tr">Branch</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select name="reference" className="w-100 rounded py-2 px-2" value={values.reference} onChange={handleChange} onBlur={handleBlur}>
                                                <option value="">Select Reference</option>
                                                {ref.map((ele, ind) => <option value={ele._id} key={ind}>{ele.name}</option>)}
                                            </select>
                                            {errors.reference && touched.reference && <><br /><span className='errors'>{errors.reference}</span></>}
                                        </td>
                                        <td>
                                            <select name="branch" className="w-100 rounded py-2 px-2" value={values.branch} onChange={handleChange} onBlur={handleBlur}>
                                                <option value="">Select Branch</option>
                                                {branch.map((ele, ind) => <option value={ele._id} key={ind}>{ele.name}</option>)}
                                            </select>
                                            {errors.branch && touched.branch && <><br /><span className='errors'>{errors.branch}</span></>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tr">Referred By</td>
                                        <td className="tr">Join Date</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" name="ref_by" placeholder="Referred By" value={values.ref_by} className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                                            {errors.ref_by && touched.ref_by && <><br /><span className='errors'>{errors.ref_by}</span></>}
                                        </td>
                                        <td>
                                            <input type="date" name="joindate" className="w-100 rounded py-2 px-2" value={values.joindate} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.joindate && touched.joindate && <><br /><span className='errors'>{errors.joindate}</span></>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tr">Inquiry By</td>
                                        <td className="tr">Inquiry Date</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select name="inquiry_by" className="w-100 rounded py-2 px-2" value={values.inquiry_by} onChange={handleChange} onBlur={handleBlur}>
                                                <option value="">Inquiry By</option>
                                                {user.map((ele, ind) => <option value={ele._id} key={ind}>{ele.admin_name}</option>)}
                                            </select>
                                            {errors.inquiry_by && touched.inquiry_by && <><br /><span className='errors'>{errors.inquiry_by}</span></>}
                                        </td>
                                        <td>
                                            <input type="date" name="inquiry_date" className="w-100 rounded py-2 px-2" value={values.inquiry_date} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.inquiry_date && touched.inquiry_date && <><br /><span className='errors'>{errors.inquiry_date}</span></>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tr">Status</td>
                                        <td className="tr">Status Date</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select name="status" className="w-100 rounded py-2 px-2" value={values.status} onChange={handleChange} onBlur={handleBlur}>
                                                <option value="">Status</option>
                                                {status.map((ele, ind) => <option value={ele._id} key={ind}>{ele.name}</option>)}
                                            </select>
                                            {errors.status && touched.status && <><br /><span className='errors'>{errors.status}</span></>}
                                        </td>
                                        <td>
                                            <input type="date" name="status_date" value={values.status_date} className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                                            {errors.status_date && touched.status_date && <><br /><span className='errors'>{errors.status_date}</span></>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className="text-center">
                                            <input type="submit" className="my-2 px-4 py-2 rounded submit" value="Add Inquiry" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </Col>
            </Row>
            <ToastContainer
                autoClose={1000}
            />
        </div>
    );
};

export default AddInquiry;