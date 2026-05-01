
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, MessageCircle, ExternalLink } from 'lucide-react';
import { CollaborationRequest } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDistanceToNow } from 'date-fns';
import API from '../../api/axios'; // Import the new middleman



interface CollaborationRequestCardProps {
  request: CollaborationRequest;
  onStatusUpdate?: (requestId: string, status: 'accepted' | 'rejected') => void;
}

export const CollaborationRequestCard: React.FC<CollaborationRequestCardProps> = ({
  request,
  onStatusUpdate
}) => {

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const handleAccept = () => {
    if (onStatusUpdate) {
      onStatusUpdate(request.id, 'accepted');
    }
  };

  const handleReject = () => {
    if (onStatusUpdate) {
      onStatusUpdate(request.id, 'rejected');
    }
  };

  // Helper to handle status changes (Accept/Reject)
  const handleStatusChange = (status: 'accepted' | 'rejected') => {
    if (onStatusUpdate) {
      onStatusUpdate(request.id, status);
    }
  };

  const handleMessage = () => {
    navigate(`/chat/${request.investorId}`);
  };

  const handleViewProfile = () => {
    navigate(`/profile/investor/${request.investorId}`);
  };

  const getStatusBadge = () => {
    switch (request.status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="error">Declined</Badge>;
      default:
        return null;
    }
  
  };
  
  

  const handleScheduleSubmit = async () => {
    if (!meetingTitle || !meetingDate) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const storedData = localStorage.getItem('business_nexus_user'); 

    if (!storedData) {
      alert("User session not found. Please log in again.");
      setIsSubmitting(false);
      return;
    }
      // Get the logged-in entrepreneur's ID from localStorage
      const user = JSON.parse(localStorage.getItem('business_nexus_user') || '{}');
      const entrepreneurId = user.id || user._id;

      if (!entrepreneurId) {
        alert("User session not found. Please log in again.");
        return;
      }

      const meetingData = {
        entrepreneur: entrepreneurId,
        investor: request.investorId,
        title: meetingTitle,
        startTime: new Date(meetingDate),
        // Default end time to 1 hour after start time
        endTime: new Date(new Date(meetingDate).getTime() + 60 * 60 * 1000), 
        description: `Meeting regarding project: ${request.projectName}`
      };

      await API.post('${API_BASE_URL}/api/meetings/schedule', meetingData);
      
      alert("✅ Meeting Scheduled Successfully!");
      
      // Reset and close
      setShowScheduleModal(false);
      setMeetingTitle('');
      setMeetingDate('');
    } catch (err: any) {
      console.error(err);
      alert(`❌ Error: ${err.response?.data?.message || "Failed to schedule"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="transition-all duration-300 border hover:border-primary-300">
      <CardBody className="flex flex-col">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <Avatar
              src="" // You can map conn.investor.avatarUrl in the Dashboard later
              alt={request.investorName || 'Investor'}
              size="md"
              className="mr-3"
            />
            
            <div>
              <h3 className="text-md font-bold text-gray-900">
                {request.investorName || 'New Connection Request'}
              </h3>
              <div className="flex flex-col space-y-1 mt-1">
                <p className="text-xs text-gray-500">
                  {request.createdAt 
                    ? formatDistanceToNow(new Date(request.createdAt), { addSuffix: true }) 
                    : 'Recently'}
                </p>
                {request.projectName && (
                  <div className="flex items-center text-xs font-medium text-primary-600">
                    <ExternalLink size={12} className="mr-1" />
                    Project: {request.projectName}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {getStatusBadge()}
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-700 italic">
            "{request.message || "I'd like to connect regarding your project."}"
          </p>
        </div>
      </CardBody>
      
      <CardFooter className="border-t border-gray-100 bg-gray-50/50">
        {request.status === 'pending' ? (
          <div className="flex justify-between w-full gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<X size={16} />}
                onClick={handleReject}
                // onClick={() => handleStatusChange('rejected')}
              >
                Decline
              </Button>
              <Button
                variant="success"
                size="sm"
                leftIcon={<Check size={16} />}
                onClick={handleAccept}
                // onClick={() => handleStatusChange('accepted')}
              >
                Accept
              </Button>
            </div>
            
            <Button
              variant="primary"
              size="sm"
              leftIcon={<MessageCircle size={16} />}
              onClick={handleMessage}
            >
              Message
            </Button>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<MessageCircle size={16} />}
              onClick={handleMessage}
            >
              Message
            </Button>
            
            {request.status === 'accepted' && (
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowScheduleModal(true)} // We will create this state next
        >
          Schedule Meeting
        </Button>
      )}

            <Button
              variant="primary"
              size="sm"
              onClick={handleViewProfile}
            >
              View Profile
            </Button>
          </div>
        )}
      </CardFooter>
      {/* --- MODAL IMPLEMENTATION --- */}
      {showScheduleModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900">Schedule Meeting</h2>
        <p className="text-sm text-gray-500 mt-1">Set up a session with {request.investorName}</p>
        
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meeting Title</label>
            <input 
              type="text" 
              className="mt-1 block w-full border rounded-md p-2 w-full focus:ring-2 focus:ring-primary-500 outline-none" 
              placeholder="e.g. Project Review" 
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date & Time</label>
            <input 
              type="datetime-local" 
              className="mt-1 block w-full border rounded-md p-2 w-full focus:ring-2 focus:ring-primary-500 outline-none" 
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowScheduleModal(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleScheduleSubmit}
            isLoading={isSubmitting} // If your Button supports an isLoading prop
          >
            {isSubmitting ? "Scheduling..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  </div>
)}
    </Card>
  );
};