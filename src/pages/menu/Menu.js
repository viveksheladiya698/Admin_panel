import { RiDashboard3Fill } from "react-icons/ri";
import { FaUserTie, FaMicrochip, FaPlus, FaBuildingColumns, FaClipboardQuestion } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { GrUserWorker } from "react-icons/gr";
import { BsFillShareFill } from "react-icons/bs";
import { IoStatsChartSharp } from "react-icons/io5";
import './Menu.css';
import { useState } from "react";
import Down from "../components/Open";
const Menu = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Close the accordion if it's already open
        } else {
            setActiveIndex(index);
        }
    };

    let menu = [
        {
            name: "Dashboard", icon: <RiDashboard3Fill className='icon' />, path: "",
            submenu: null
        },
        {
            name: "Manage User", icon: <FaUserTie className='icon' />,
            submenu: [
                { name: "Add User", icon: <FaPlus />, path: "add/user" },
                { name: "View User", icon: <IoIosEye />, path: "view/user" }
            ]
        },
        {
            name: "Manage Role", icon: <GrUserWorker className="icon" />,
            submenu: [
                { name: "Add Role", icon: <FaPlus />, path: "add/role" },
                { name: "View Role", icon: <IoIosEye />, path: "view/role" }
            ]
        },
        {
            name: "Manage Branch", icon: <FaBuildingColumns className="icon" />,
            submenu: [
                { name: "Add Branch", icon: <FaPlus />, path: "add/branch" },
                { name: "View Branch", icon: <IoIosEye />, path: "view/branch" }
            ]
        },
        {
            name: "Manage Course", icon: <FaMicrochip className='icon' />,
            submenu: [
                { name: "Add Course", icon: <FaPlus />, path: "add/course" },
                { name: "View Course", icon: <IoIosEye />, path: "view/course" }
            ]
        },
        {
            name: "Reference", icon: <BsFillShareFill className="icon" />,
            submenu: [
                { name: "Add Reference", icon: <FaPlus />, path: "add/reference" },
                { name: "View Reference", icon: <IoIosEye />, path: "view/reference" }
            ]
        },
        {
            name: "Status", icon: <IoStatsChartSharp className="icon" />,
            submenu: [
                { name: "Add Status", icon: <FaPlus />, path: "add/status" },
                { name: "View Status", icon: <IoIosEye />, path: "view/status" }
            ]
        },
        {
            name: "Inquiry", icon: <FaClipboardQuestion className='icon' />,
            submenu: [
                { name: "Add Inquiry", icon: <FaPlus />, path: "add/inquiry" },
                { name: "View Inquiry", icon: <IoIosEye />, path: "view/inquiry" }
            ]
        }
    ];
    return (
        <div className="menu-box">
            <ul className="main-menu">
                {
                    menu.map((ele, ind) => {
                        return (
                            ele.submenu != null ? (
                                <li>
                                    <Down
                                        key={ind}
                                        title={ele.name}
                                        icon={ele.icon}
                                        content={ele.submenu}
                                        isOpen={activeIndex === ind}
                                        toggleAccordion={() => toggleAccordion(ind)}
                                    />
                                </li>) : (
                                <Link to={ele.path}>
                                    <li className="focus"><span className="icon me-2">{ele.icon}</span>{ele.name}</li>
                                </Link>
                            )
                        )
                    })
                }
                {/* {menu.map((ele, ind) => (
                    <li key={ind}>
                        {ele.submenu !== null ? (
                            <Accordion className="menu-down border-0" >
                                <Accordion.Item eventKey="ind">
                                    <Accordion.Header>
                                        <span className="icon me-2 theme-color">{ele.icon}</span>
                                        <span className="theme-color">{ele.name}</span>
                                    </Accordion.Header>
                                    <Accordion.Body className="p-0">
                                        <ul className='sub-menu theme-color'>
                                            {ele.submenu.map((subEle, subInd) => (
                                                <li key={subInd}>
                                                    <Link to={`${subEle.path}`}>
                                                        <span className="icon ms-1 me-2">{subEle.icon}</span>
                                                        {subEle.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ) : (
                            <div className="focus" key={ind}>
                                <Link to={`${ele.path}`}>
                                    <span className='icon-box me-2'>{ele.icon}</span>
                                    {ele.name}
                                </Link>
                            </div>
                        )} */}
                {/* </li> */}
                {/* ))} */}
            </ul>
        </div>
    );
};
export default Menu;