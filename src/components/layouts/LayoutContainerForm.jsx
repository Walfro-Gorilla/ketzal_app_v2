import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";

const LayoutContainerForm = () => {
    return (
        <div className="w-96 mx-auto mt-10" >
            {/* <Navbar/> */}
            <Outlet />            
            {/* <Footer /> */}

        </div>
    )
}

export default LayoutContainerForm;