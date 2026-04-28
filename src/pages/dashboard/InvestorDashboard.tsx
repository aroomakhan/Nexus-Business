import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, PieChart, Filter, Search, PlusCircle, Briefcase, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { MeetingCalendar } from '../../components/MeetingCalendar';

// Define the Project interface
interface Project {
  _id: string;
  title: string;
  description: string;
  fundingGoal: number;
  category: string;
  owner: string;
}

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  if (!user) return null;
  
  // Filter projects based on search and industry filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(project.category);
    
    return matchesSearch && matchesIndustry;
  });
  
  // Get unique industries from real project categories
  const industries = Array.from(new Set(projects.map(p => p.category)));
  
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prevSelected => 
      prevSelected.includes(industry)
        ? prevSelected.filter(i => i !== industry)
        : [...prevSelected, industry]
    );
  };

  const handleConnect = async (projectId: string, entrepreneurId: string) => {
  try {
    const res = await axios.post('http://localhost:5000/api/connections', {
      investorId: user.id,
      entrepreneurId: entrepreneurId,
      projectId: projectId,
      message: `I am interested in your project: ${projects.find(p => p._id === projectId)?.title}`
    });

    if (res.status === 200) {
      alert("Connection request sent successfully!");
    }
  } catch (err: any) {
    console.error("Error connecting:", err);
    // If the backend returns our 400 error (request already exists)
    alert(err.response?.data?.message || "Failed to send request.");
  }
};
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with promising opportunities</p>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search projects, categories, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <Badge
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                  className="cursor-pointer"
                  onClick={() => toggleIndustry(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
              


      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-full mr-4">
              <Briefcase size={20} className="text-primary-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-700">Active Projects</p>
              <h3 className="text-xl font-semibold text-primary-900">{projects.length}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-secondary-100 rounded-full mr-4">
              <PieChart size={20} className="text-secondary-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-700">Industries</p>
              <h3 className="text-xl font-semibold text-secondary-900">{industries.length}</h3>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Projects grid */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Available Opportunities</h2>
        </CardHeader>
        <CardBody>
          {loading ? (
            <p className="text-center py-8">Loading startups...</p>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <div key={project._id} className="p-5 border rounded-xl hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="secondary">{project.category}</Badge>
                      <TrendingUp size={16} className="text-green-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{project.description}</p>
                  </div>
                  
                  <div className="border-t pt-4 mt-auto">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Goal</p>
                        <p className="text-md font-bold text-blue-600">PKR {project.fundingGoal.toLocaleString()}</p>
                      </div>
                      {/* <Button size="sm">Connect</Button> */}
                      <Button size="sm" onClick={() => handleConnect(project._id, project.owner)}>
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">No projects found matching your search.</p>
            </div>
          )}
        </CardBody>
      </Card>
      <div className="lg:col-span-1">
            <div className="sticky top-6">
              <MeetingCalendar />
            </div>
          </div>
          
    </div>
    
  );
};