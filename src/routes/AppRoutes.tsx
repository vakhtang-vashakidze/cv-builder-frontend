import {Route, Routes} from 'react-router-dom';
import CvBuilderPage from "../pages/CvBuilderPage.tsx";

export function AppRoutes() {
    return (
        <Routes>
            {/*upon introducing home and other pages change to /cvbuilder */}
            <Route path="/" element={<CvBuilderPage/>}/>
        </Routes>
    );
}