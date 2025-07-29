import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-[10%] h-full bg-white shadow-md p-4 flex flex-col">
            <Link to="/" className="mb-4 text-blue-600 font-bold">CV Builder</Link>
            <Link to="/" className="text-gray-700 hover:text-blue-600 mb-2">Home</Link>
            <Link to="/builder" className="text-gray-700 hover:text-blue-600">Build CV</Link>
        </div>
    );
};

export default Sidebar;