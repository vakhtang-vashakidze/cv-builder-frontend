import {Route, Routes} from 'react-router-dom';
import CvBuilderPage from "../pages/CvBuilderPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import Sidebar from "../components/Sidebar.tsx";

export function AppRoutes() {
    return (
        <div className="w-full h-[100vh] flex flex-row">
            <Sidebar/>
            <div className="w-[90%] h-full overflow-auto">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/builder" element={<CvBuilderPage />} />
                </Routes>
            </div>
        </div>
    );
}