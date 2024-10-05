import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('userId');
        Cookies.remove('email');
        Cookies.remove('userRole');
        navigate('/customerlogin');
      };
    
      const isLoggedIn = Cookies.get('userId');
  return (
    <div className="bg-[#f9ffc2] w-64 min-h-screen p-6 shadow-lg">
      
      <ul className="space-y-4">
      <li>
          <Link 
            to="/mainadmindashboard" 
            className="block p-3 rounded-lg transition-colors bg-[#F6F1E5] text-[#cfa226] hover:bg-[#9e972f] hover:text-white"
          >
           Main Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/employeeview" 
            className="block p-3 rounded-lg transition-colors bg-[#F6F1E5] text-[#cfa226] hover:bg-[#9e972f] hover:text-white"
          >
            Employee View
          </Link>
        </li>
        <li>
          <Link 
            to="/employeeadd" 
            className="block p-3 rounded-lg transition-colors bg-[#F6F1E5] text-[#cfa226] hover:bg-[#9e972f] hover:text-white"
          >
            Add Employee
          </Link>
        </li>
        <li>
          <Link 
            to="/addtask" 
            className="block p-3 rounded-lg transition-colors bg-[#F6F1E5] text-[#cfa226] hover:bg-[#9e972f] hover:text-white"
          >
            Add Task
          </Link>
        </li>
        <li>
          <Link 
            to="/viewtask" 
            className="block p-3 rounded-lg transition-colors bg-[#F6F1E5] text-[#cfa226] hover:bg-[#9e972f] hover:text-white"
          >
            View Task
          </Link>
        </li>
        <li>
          <Link 
            to="/addsalary" 
            className="block p-3 rounded-lg transition-colors bg-[#F6F1E5] text-[#cfa226] hover:bg-[#9e972f] hover:text-white"
          >
            Add Salary
          </Link>
        </li>
        <li>
          <Link 
            to="/showsalary" 
            className="block p-3 rounded-lg transition-colors bg-[#F6F1E5] text-[#cfa226] hover:bg-[#9e972f] hover:text-white"
          >
            Show Salaries
          </Link>
        </li>
        <li>
          <button 
            onClick={handleLogout} 
            className="block p-3 rounded-lg transition-colors bg-[#F6F1E5] text-[#cfa226] hover:bg-[#9e972f] hover:text-white"
          >
            Logout
          </button>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
