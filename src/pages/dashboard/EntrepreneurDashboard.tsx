import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle, Briefcase, Trash2 } from 'lucide-react'; // Added Trash2 icon
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';
import { MeetingCalendar } from '../../components/MeetingCalendar';
import { API_BASE_URL } from '../../config';
import API from '../../api/axios'; // Import the new middleman

interface Project {
  _id: string;
  title: string;
  description: string;
  fundingGoal: number;
  category: string;
}

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [recommendedInvestors, setRecommendedInvestors] = useState(investors.slice(0, 3));
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);


  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const ownerId = user.id; // Ensure we use the correct ID property

          // 1. FETCH REAL CONNECTION REQUESTS FROM BACKEND
          const connRes = await API.get(`${API_BASE_URL}/api/connections/entrepreneur/${ownerId}`);
          
          // Map backend data to your CollaborationRequest interface
          const formattedRequests = connRes.data.map((conn: any) => ({
            id: conn._id,
            investorId: conn.investor?._id || conn.investor,
            investorName: conn.investor?.name || 'Interest from Investor', 
            projectId: conn.project?._id,
            projectName: conn.project?.title || 'Startup Project',
            message: conn.message || 'No message provided',
            status: conn.status,
            createdAt: conn.createdAt
}));
          



          setCollaborationRequests(formattedRequests);

          // 2. FETCH PROJECTS (You already had this)
          const projRes = await API.get(`${API_BASE_URL}/api/projects/user/${ownerId}`);
          setMyProjects(projRes.data);

        } catch (err) {
          console.error("Error fetching dashboard data:", err);
        } finally {
          setLoadingProjects(false);
        }
      };

      fetchData();
    }
  }, [user]);

  // --- NEW DELETE FUNCTION ---
  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.delete(`${API_BASE_URL}/api/projects/${projectId}`);
        // Remove the project from the UI list immediately
        setMyProjects(prev => prev.filter(p => p._id !== projectId));
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  // const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
  //   setCollaborationRequests(prevRequests => 
  //     prevRequests.map(req => 
  //       req.id === requestId ? { ...req, status } : req
  //     )
  //   );
  // };

  const handleRequestStatusUpdate = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      // 1. Permanent change in MongoDB
      await API.put(`${API_BASE_URL}/api/connections/${requestId}`, { status });

      // 2. Immediate UI update
      setCollaborationRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId ? { ...req, status } : req
        )
      );
      
      console.log(`Successfully updated request ${requestId} to ${status}`);
    } 
    // catch (err) {
    //   console.error("Error updating status:", err);
    //   alert("Could not update the request. Please check your connection.");
    // }
    catch (err: any) {
  console.error("Full Error:", err);
  // This will tell us if it's a 404 (Route not found) or 500 (Database error)
  alert(`Failed: ${err.response?.status} - ${err.response?.data?.message || err.message}`);
}
  };

  
  
  if (!user) return null;
  
  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600">Here's what's happening with your startup today</p>
        </div>
        
        <div className="flex space-x-3">
           <Link to="/dashboard/create-project">
            <Button variant="outline" leftIcon={<PlusCircle size={18} />}>
              Post New Project
            </Button>
          </Link>
          <Link to="/investors">
            <Button>Find Investors</Button>
          </Link>
        </div>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Briefcase size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">My Projects</p>
                <h3 className="text-xl font-semibold text-primary-900">{myProjects.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* MY POSTED PROJECTS SECTION */}
      <Card>
        <CardHeader className="flex justify-between items-center border-b">
          <h2 className="text-lg font-medium text-gray-900">My Posted Projects</h2>
          <Badge variant="success">{myProjects.length} Active</Badge>
        </CardHeader>
        <CardBody>
          {loadingProjects ? (
            <p className="text-center py-4">Loading your projects...</p>
          ) : myProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myProjects.map((project) => (
                <div key={project._id} className="p-4 border rounded-lg bg-gray-50 relative group hover:border-blue-400 transition-all">
                  
                  {/* DELETE BUTTON */}
                  <button 
                    onClick={() => handleDeleteProject(project._id)}
                    className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex justify-between items-start pr-8">
                    <h3 className="font-bold text-gray-900 text-lg">{project.title}</h3>
                  </div>
                  <Badge variant="secondary" className="mt-1">{project.category}</Badge>
                  
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                  
                  <div className="mt-4 flex items-center justify-between text-sm border-t pt-3">
                    <span className="text-gray-500 font-medium text-xs uppercase">Funding Goal</span>
                    <span className="font-bold text-green-600">PKR {project.fundingGoal.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
               <p className="text-gray-500 italic">You haven't posted any projects yet.</p>
            </div>
          )}
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Collaboration Requests</h2>
              <Badge variant="primary">{pendingRequests.length} pending</Badge>
            </CardHeader>
            <CardBody>
              {collaborationRequests.length > 0 ? (
                <div className="space-y-4">
                  {collaborationRequests.map(request => (
                    <CollaborationRequestCard
                      key={request.id}
                      request={request}
                      onStatusUpdate={handleRequestStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle size={24} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600">No collaboration requests yet</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recommended Investors</h2>
              <Link to="/investors" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </CardHeader>
            <CardBody className="space-y-4">
              {recommendedInvestors.map(investor => (
                <InvestorCard
                  key={investor.id}
                  investor={investor}
                  showActions={false}
                />
              ))}
            </CardBody>
          </Card>
          <MeetingCalendar />
        </div>
        
        <div className="mt-8">
      
    </div>
      </div>
    </div>
  );
};