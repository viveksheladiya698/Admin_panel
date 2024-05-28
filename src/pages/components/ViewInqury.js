// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { Button, Col, Modal, Row } from 'react-bootstrap';
// import { FaRegEdit } from 'react-icons/fa';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { Link } from 'react-router-dom';
// import * as Yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ViewInqury = () => {
//   const Update = () => toast.success("inqury Updeted Successfully!");
//   const Delete = () => toast.success("inqury Deleted Successfully!");
//   const err = () => toast.error("Something Went Wrong!")

//   // Update Inqury
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   // Delete Inqury
//   const [show1, setShow1] = useState(false);
//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);

//   const [user, setUser] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [ref, setRef] = useState([]);
//   const [inqury, setinqury] = useState([]);
//   const [updateid, setupdateid] = useState(null);

//   let token = localStorage.getItem('token');
//   let headers = {
//     authorization: token
//   }

//   const getData = async () => {
//     try {
//       const branchRes = await axios.get('http://localhost:4000/branch/view_branch', { headers });
//       setBranch(branchRes.data.data);

//       const refRes = await axios.get('http://localhost:4000/ref/view_reference', { headers });
//       setRef(refRes.data.data);

//       const userRes = await axios.get('http://localhost:4000/auth/view_admin', { headers });
//       setUser(userRes.data.data);

//       const inquery = await axios.get('http://localhost:4000/inquiry/view_inquiry', { headers });
//       console.log(inquery.data.data)
//       setinqury(inquery.data.data);

//     } catch (error) {
//       console.log(error);
//       err();
//     }
//   };


//   useEffect(() => {
//     getData();
//   }, []);

//   let delete_inqury = async () => {
//     try {
//       let res = await axios.get(`http://localhost:4000/inquiry/inquiry_delete/${updateid}`, { headers });
//       handleClose1();
//       setupdateid(null);
//       getData();
//       Delete();
//     } catch (error) {
//       error();
//     }
//   }

//   // update role 

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid Email").required("Email is required"),
//     name: Yup.string().min(3, "It's too short").max(30, "It's too long").required("Name is required"),
//     contact: Yup.string().min(10, "It's too short").max(10, "It's too long").required("Contact is required"),
//     reference: Yup.string().required("Reference is required"),
//     branch: Yup.string().required("Branch is required"),
//     ref_by: Yup.string().required("Referred By is required"),
//     joindate: Yup.string().required("Join Date is required"),
//     inquiry_by: Yup.string().required("Inquiry By is required"),
//     inquiry_date: Yup.string().required("Inquiry Date is required"),
//     status: Yup.string().required("Status is required"),
//     status_date: Yup.string().required("Status Date is required")
//   });

//   const initialValues = {
//     email: "",
//     name: "",
//     contact: "",
//     reference: "",
//     branch: "",
//     ref_by: "",
//     joindate: "",
//     inquiry_by: "",
//     inquiry_date: "",
//     status: "",
//     status_date: ""
//   };

//   const { values, handleBlur, handleChange, handleReset, handleSubmit, errors, touched } = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const res = await axios.post(`http://localhost:4000/inquiry/inquiry_update/${updateid}`, values, { headers });
//         handleClose();
//         setupdateid(null)
//         Update();
//         getData();
//       } catch (err) {
//         console.log(err);
//         err();
//       }
//     }
//   });
//   return (
//     <>
//       <div className="view-roll">
//         <div className="d-flex justify-content-between align-items-center my-3 px-3">
//           <h2 className='heading'>View inquiry</h2>
//           <span className='home'><Link to={'/dashboard'}>Home</Link> / View inquiry</span>
//         </div>
//         <div className="dispaly">
//           <Row className='justify-content-center mt-5'>
//             <Col lg={10}>
//               <div className="display-table rounded-3 shadow dispaly-padding">
//                 <h3 className='text-center form-heading'>All inquiry</h3>
//                 <table className='w-100 mt-4'>
//                   <tr>
//                     <th className='text-center'> Id </th>
//                     <th className='text-center'>Name</th>
//                     <th className='text-center'>Email</th>
//                     <th className='text-center'>Contact</th>
//                     <th className='text-center'>Branch</th>
//                     <th className='text-center'>Inqury By</th>
//                     <th className='text-center'>Referance</th>
//                     <th className='text-center'>Visit Date</th>
//                     <th className='text-center'>Status</th>
//                     <th className='text-center'>Action</th>
//                   </tr>
//                   {
//                     inqury.map((ele, ind) => {
//                       return (
//                         <tr key={ind}>
//                           <td className='text-center'>{ind + 1}</td>
//                           <td className='text-center'>{ele.name}</td>
//                           <td className='text-center'>{ele.email}</td>
//                           <td className='text-center'>{ele.contact}</td>
//                           <td className='text-center'>{ele.branch?.name}</td>
//                           <td className='text-center'>{ele.inquiry_by?.admin_name}</td>
//                           <td className='text-center'>{ele.reference?.name}</td>
//                           <td className='text-center'>{ele.inquiry_date}</td>
//                           <td className='text-center'>{ele.status?.name}</td>
//                           <td className='text-center'>
//                             <span className='edit-btn'>
//                               <Button onClick={() => {
//                                 handleShow();
//                                 setupdateid(ele._id)
//                                 values.name = ele.name
//                               }} className='me-2'>
//                                 <FaRegEdit className='edit position' />
//                               </Button>
//                               <RiDeleteBin6Line className='delete' onClick={() => { setupdateid(ele._id)
//                                 handleShow1();
//                                }} />
//                             </span>
//                           </td>
//                         </tr>
//                       )
//                     })
//                   }
//                 </table>
//               </div>
//             </Col>
//           </Row>
//           {/* Update Inquiry */}
//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Update Inquery</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <form method='post' className='m-auto px-4' onSubmit={handleSubmit}>
//                 <table className="w-100">
//                   <tbody>
//                     <tr>
//                       <td className="tr">Email</td>
//                     </tr>
//                     <tr>
//                       <td colSpan={2}>
//                         <input type="text" name="email" placeholder="Enter Your Email" className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
//                         {errors.email && touched.email && <><br /><span className='errors'>{errors.email}</span></>}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="tr">Name</td>
//                       <td className="tr">Contact</td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <input type="text" name="name" placeholder="Enter Your Name" className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
//                         {errors.name && touched.name && <><br /><span className='errors'>{errors.name}</span></>}
//                       </td>
//                       <td>
//                         <input type="text" name="contact" placeholder="Enter Contact Number" className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
//                         {errors.contact && touched.contact && <><br /><span className='errors'>{errors.contact}</span></>}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="tr">Reference</td>
//                       <td className="tr">Branch</td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <select name="reference" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur}>
//                           <option value="">Select Reference</option>
//                           {ref.map((ele, ind) => <option value={ele._id} key={ind}>{ele.name}</option>)}
//                         </select>
//                         {errors.reference && touched.reference && <><br /><span className='errors'>{errors.reference}</span></>}
//                       </td>
//                       <td>
//                         <select name="branch" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur}>
//                           <option value="">Select Branch</option>
//                           {branch.map((ele, ind) => <option value={ele._id} key={ind}>{ele.name}</option>)}
//                         </select>
//                         {errors.branch && touched.branch && <><br /><span className='errors'>{errors.branch}</span></>}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="tr">Referred By</td>
//                       <td className="tr">Join Date</td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <input type="text" name="ref_by" placeholder="Referred By" className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
//                         {errors.ref_by && touched.ref_by && <><br /><span className='errors'>{errors.ref_by}</span></>}
//                       </td>
//                       <td>
//                         <input type="date" name="joindate" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
//                         {errors.joindate && touched.joindate && <><br /><span className='errors'>{errors.joindate}</span></>}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="tr">Inquiry By</td>
//                       <td className="tr">Inquiry Date</td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <select name="inquiry_by" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur}>
//                           <option value="">Inquiry By</option>
//                           {user.map((ele, ind) => <option value={ele._id} key={ind}>{ele.admin_name}</option>)}
//                         </select>
//                         {errors.inquiry_by && touched.inquiry_by && <><br /><span className='errors'>{errors.inquiry_by}</span></>}
//                       </td>
//                       <td>
//                         <input type="date" name="inquiry_date" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
//                         {errors.inquiry_date && touched.inquiry_date && <><br /><span className='errors'>{errors.inquiry_date}</span></>}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="tr">Status</td>
//                       <td className="tr">Status Date</td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <select name="status" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur}>
//                           <option value="">Status</option>
//                           <option value="664aea27241ed3d4f902f8ce">Panding</option>
//                         </select>
//                         {errors.status && touched.status && <><br /><span className='errors'>{errors.status}</span></>}
//                       </td>
//                       <td>
//                         <input type="date" name="status_date" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
//                         {errors.status_date && touched.status_date && <><br /><span className='errors'>{errors.status_date}</span></>}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td colSpan={2} className="text-center">
//                         <input type="submit" className="my-2 px-4 py-2 rounded submit" value="Add Inquiry" />
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </form>
//             </Modal.Body>
//           </Modal>
//           {/* Delete Inqury */}
//           <Modal show={show1} onHide={handleClose1}>
//             <Modal.Header closeButton>
//               <Modal.Title>Delete Inqury</Modal.Title>
//             </Modal.Header>
//             <Modal.Body><span className='danger'>Are You Sure Want to Delete This Inquery..!</span></Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose1}>
//                 CLOSE
//               </Button>
//               <Button variant="danger" onClick={() => {
//                 delete_inqury();
//               }}>
//                 DELETE
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </div>
//       <ToastContainer
//         autoClose={1000}
//       />
//     </>
//   )
// }

// export default ViewInqury

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-paginate/dist/react-paginate.css';

const ViewInqury = () => {
  const Update = () => toast.success("Inquiry Updated Successfully!");
  const Delete = () => toast.success("Inquiry Deleted Successfully!");
  const err = () => toast.error("Something Went Wrong!");

  // Update Inquiry
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Delete Inquiry
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [user, setUser] = useState([]);
  const [branch, setBranch] = useState([]);
  const [ref, setRef] = useState([]);
  const [inqury, setinqury] = useState([]);
  const [updateid, setupdateid] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  let token = localStorage.getItem('token');
  let headers = {
    authorization: token
  }

  const getData = async () => {
    try {
      const branchRes = await axios.get('http://localhost:4000/branch/view_branch', { headers });
      setBranch(branchRes.data.data);

      const refRes = await axios.get('http://localhost:4000/ref/view_reference', { headers });
      setRef(refRes.data.data);

      const userRes = await axios.get('http://localhost:4000/auth/view_admin', { headers });
      setUser(userRes.data.data);

      const inquery = await axios.get('http://localhost:4000/inquiry/view_inquiry', { headers });
      console.log(inquery.data.data);
      setinqury(inquery.data.data);

    } catch (error) {
      console.log(error);
      err();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let delete_inqury = async () => {
    try {
      let res = await axios.get(`http://localhost:4000/inquiry/inquiry_delete/${updateid}`, { headers });
      handleClose1();
      setupdateid(null);
      getData();
      Delete();
    } catch (error) {
      err();
    }
  }

  // Update role
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
        const res = await axios.post(`http://localhost:4000/inquiry/inquiry_update/${updateid}`, values, { headers });
        handleClose();
        setupdateid(null);
        Update();
        getData();
      } catch (err) {
        console.log(err);
        err();
      }
    }
  });

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = inqury.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(inqury.length / itemsPerPage);

  return (
    <>
      <div className="view-roll">
        <div className="d-flex justify-content-between align-items-center my-3 px-3">
          <h2 className='heading'>View inquiry</h2>
          <span className='home'><Link to={'/dashboard'}>Home</Link> / View inquiry</span>
        </div>
        <div className="dispaly">
          <Row className='justify-content-center mt-5'>
            <Col lg={10}>
              <div className="display-table rounded-3 shadow dispaly-padding">
                <h3 className='text-center form-heading'>All inquiry</h3>
                <table className='w-100 mt-4'>
                  <thead>
                    <tr>
                      <th className='text-center'> Id </th>
                      <th className='text-center'>Name</th>
                      <th className='text-center'>Email</th>
                      <th className='text-center'>Contact</th>
                      <th className='text-center'>Branch</th>
                      <th className='text-center'>Inquiry By</th>
                      <th className='text-center'>Reference</th>
                      <th className='text-center'>Visit Date</th>
                      <th className='text-center'>Status</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((ele, ind) => (
                      <tr key={ind}>
                        <td className='text-center'>{offset + ind + 1}</td>
                        <td className='text-center'>{ele.name}</td>
                        <td className='text-center'>{ele.email}</td>
                        <td className='text-center'>{ele.contact}</td>
                        <td className='text-center'>{ele.branch?.name}</td>
                        <td className='text-center'>{ele.inquiry_by?.admin_name}</td>
                        <td className='text-center'>{ele.reference?.name}</td>
                        <td className='text-center'>{ele.inquiry_date}</td>
                        <td className='text-center'>{ele.status?.name}</td>
                        <td className='text-center'>
                          <span className='edit-btn'>
                            <Button onClick={() => {
                              handleShow();
                              setupdateid(ele._id);
                              values.name = ele.name;
                            }} className='me-2'>
                              <FaRegEdit className='edit position' />
                            </Button>
                            <RiDeleteBin6Line className='delete' onClick={() => {
                              setupdateid(ele._id);
                              handleShow1();
                            }} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                />
              </div>
            </Col>
          </Row>
          {/* Update Inquiry */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Inquiry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form method='post' className='m-auto px-4' onSubmit={handleSubmit}>
                <table className="w-100">
                  <tbody>
                    <tr>
                      <td className="tr">Email</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <input type="text" name="email" placeholder="Enter Your Email" className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email && <><br /><span className='errors'>{errors.email}</span></>}
                      </td>
                    </tr>
                    <tr>
                      <td className="tr">Name</td>
                      <td className="tr">Contact</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="text" name="name" placeholder="Enter Your Name" className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                        {errors.name && touched.name && <><br /><span className='errors'>{errors.name}</span></>}
                      </td>
                      <td>
                        <input type="text" name="contact" placeholder="Enter Contact Number" className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                        {errors.contact && touched.contact && <><br /><span className='errors'>{errors.contact}</span></>}
                      </td>
                    </tr>
                    <tr>
                      <td className="tr">Reference</td>
                      <td className="tr">Branch</td>
                    </tr>
                    <tr>
                      <td>
                        <select name="reference" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur}>
                          <option value="">Select Reference</option>
                          {ref.map((ele, ind) => <option value={ele._id} key={ind}>{ele.name}</option>)}
                        </select>
                        {errors.reference && touched.reference && <><br /><span className='errors'>{errors.reference}</span></>}
                      </td>
                      <td>
                        <select name="branch" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur}>
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
                        <input type="text" name="ref_by" placeholder="Referred By" className="rounded w-100 py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                        {errors.ref_by && touched.ref_by && <><br /><span className='errors'>{errors.ref_by}</span></>}
                      </td>
                      <td>
                        <input type="date" name="joindate" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                        {errors.joindate && touched.joindate && <><br /><span className='errors'>{errors.joindate}</span></>}
                      </td>
                    </tr>
                    <tr>
                      <td className="tr">Inquiry By</td>
                      <td className="tr">Inquiry Date</td>
                    </tr>
                    <tr>
                      <td>
                        <select name="inquiry_by" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur}>
                          <option value="">Inquiry By</option>
                          {user.map((ele, ind) => <option value={ele._id} key={ind}>{ele.admin_name}</option>)}
                        </select>
                        {errors.inquiry_by && touched.inquiry_by && <><br /><span className='errors'>{errors.inquiry_by}</span></>}
                      </td>
                      <td>
                        <input type="date" name="inquiry_date" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                        {errors.inquiry_date && touched.inquiry_date && <><br /><span className='errors'>{errors.inquiry_date}</span></>}
                      </td>
                    </tr>
                    <tr>
                      <td className="tr">Status</td>
                      <td className="tr">Status Date</td>
                    </tr>
                    <tr>
                      <td>
                        <select name="status" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur}>
                          <option value="">Status</option>
                          <option value="664aea27241ed3d4f902f8ce">Pending</option>
                        </select>
                        {errors.status && touched.status && <><br /><span className='errors'>{errors.status}</span></>}
                      </td>
                      <td>
                        <input type="date" name="status_date" className="w-100 rounded py-2 px-2" onChange={handleChange} onBlur={handleBlur} />
                        {errors.status_date && touched.status_date && <><br /><span className='errors'>{errors.status_date}</span></>}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-center">
                        <input type="submit" className="my-2 px-4 py-2 rounded submit" value="Update Inquiry" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </Modal.Body>
          </Modal>
          {/* Delete Inquiry */}
          <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Inquiry</Modal.Title>
            </Modal.Header>
            <Modal.Body><span className='danger'>Are You Sure Want to Delete This Inquiry..!</span></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                CLOSE
              </Button>
              <Button variant="danger" onClick={delete_inqury}>
                DELETE
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  )
}

export default ViewInqury;
