import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // 1. Import your auth hook
import API from '../../api/axios'; // Import the new middleman


const CreateProject = () => {
  const { user } = useAuth(); // 2. Get the real-time user object from your context
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fundingGoal: '',
    category: 'Tech'
  });

  const { title, description, fundingGoal, category } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 3. Extract the ID directly from the context user
    const ownerId = user?.id || user?.id;

    if (!ownerId) {
      console.error("User context found, but ID is missing:", user);
      alert("❌ Error: User ID not found. Please try logging out and logging back in.");
      return;
    }

    try {
      const newProject = {
        title,
        description,
        fundingGoal: Number(fundingGoal),
        category,
        owner: ownerId 
      };

      console.log("Sending project to server:", newProject);

      // 4. Send request to backend
      const res = await API.post('${API_BASE_URL}/api/projects', newProject);
      
      if (res.status === 201 || res.status === 200) {
        alert('✅ Project successfully posted!');
        setFormData({ title: '', description: '', fundingGoal: '', category: 'Tech' });
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Backend Error Details:", err.response?.data);
        const serverMessage = err.response?.data?.error || err.response?.data?.message;
        alert(`❌ Error: ${serverMessage || 'Server Error'}`);
      } else {
        console.error("Non-Axios Error:", err);
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Post Your Business Idea</h2>
      <p className="text-sm text-gray-500 mb-4">Posting as: <span className="font-semibold text-blue-600">{user?.name || 'Entrepreneur'}</span></p>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Title</label>
          <input 
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
            type="text" 
            placeholder="e.g. Eco-Friendly Logistics" 
            name="title" 
            value={title} 
            onChange={onChange} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            className="w-full p-2 border border-gray-300 rounded mt-1 h-32"
            placeholder="Describe your startup idea..." 
            name="description" 
            value={description} 
            onChange={onChange} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Funding Goal (PKR)</label>
          <input 
            className="w-full p-2 border border-gray-300 rounded mt-1"
            type="number" 
            placeholder="e.g. 1000000" 
            name="fundingGoal" 
            value={fundingGoal} 
            onChange={onChange} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-white"
            name="category" 
            value={category} 
            onChange={onChange}
          >
            <option value="Tech">Tech</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-semibold mt-4 shadow-sm"
        >
          Publish Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;