import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import Sidebar from './employeeSideBar'; // Import the Sidebar component

const ViewTask = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8020/task');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`http://localhost:8020/task/${id}`); // Corrected API path
                setTasks(tasks.filter((task) => task._id !== id));
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleGenerateReport = () => {
        const doc = new jsPDF();
        doc.text('Tasks Report', 14, 16);
        doc.autoTable({
            head: [['Title', 'Description', 'Assigned Employee', 'Status', 'Priority', 'Due Date']],
            body: tasks.map((task) => [
                task.title, // Corrected field access
                task.description,
                task.assignedEmployeeId?.name || 'N/A',
                task.status,
                task.priority,
                new Date(task.dueDate).toLocaleDateString(),
            ]),
        });
        doc.save('tasks_report.pdf');
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-[#F6F1E5] min-h-screen">
                <h1 className="text-5xl font-extrabold mb-8 text-center text-[#cfa226] shadow-md">Task Management</h1>

                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-2 border-[#9e972f] p-3 rounded w-2/4 mr-4 shadow-md focus:outline-none focus:ring-2 focus:ring-[#9e972f] transition duration-200"
                    />
                    <button
                        className="bg-gradient-to-r from-[#FFC107] to-[#FFA000] text-white py-3 rounded-lg hover:shadow-lg transition duration-300 p-6"
                        onClick={handleGenerateReport}
                    >
                        Generate Report
                    </button>
                </div>

                <table className="min-w-full bg-white border border-[#9e972f] rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr className="bg-[#E2E8CE] text-left">
                            <th className="border border-[#9e972f] p-4 font-semibold">Title</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Description</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Assigned Employee</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Status</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Priority</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Due Date</th>
                            <th className="border border-[#9e972f] p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task) => (
                            <tr key={task._id} className="odd:bg-[#f9f9f7] even:bg-[#f1f0ea] transition duration-200 hover:bg-[#E2E8CE]">
                                <td className="border border-[#9e972f] p-4">{task.title}</td>
                                <td className="border border-[#9e972f] p-4">{task.description}</td>
                                <td className="border border-[#9e972f] p-4">{task.assignedEmployeeId?.name || 'N/A'}</td>
                                <td className="border border-[#9e972f] p-4">{task.status}</td>
                                <td className="border border-[#9e972f] p-4">{task.priority}</td>
                                <td className="border border-[#9e972f] p-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                                <td className="border border-[#9e972f] p-4 flex gap-2">
                                    <button 
                                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                        onClick={() => navigate(`/updatetask/${task._id}`)}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewTask;
