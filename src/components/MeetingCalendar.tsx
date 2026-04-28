import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const calendarStyles = `
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr) !important;
    width: 100% !important;
  }
  .react-calendar {
    width: 100% !important;
    max-width: 500px; 
    border: none !important;
    font-family: inherit !important;
  }
  .react-calendar__tile {
    padding: 15px 5px !important;
    height: 50px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .meeting-highlight {
    background: #dbeafe !important;
    color: #1e40af !important;
    border-radius: 50% !important;
    font-weight: bold !important;
  }
`;

export const MeetingCalendar = () => {
  const [meetings, setMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleStatusUpdate = async (meetingId: string, action: 'accept' | 'reject') => {
    try {
      await axios.patch(`http://localhost:5000/api/meetings/${meetingId}/${action}`);
      alert(`Meeting ${action}ed successfully!`);
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const storedData = localStorage.getItem('business_nexus_user');
        if (!storedData) return;
        const userData = JSON.parse(storedData);
        const userId = userData.id || userData._id;
        const res = await axios.get(`http://localhost:5000/api/meetings/user/${userId}`);
        setMeetings(res.data);
      } catch (err) {
        console.error("Error fetching meetings", err);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
      <style>{calendarStyles}</style>
      
      <h2 className="text-lg font-bold mb-4 text-gray-800">Schedule</h2>
      
      <div className="mb-6">
        <Calendar 
          onChange={(val) => setSelectedDate(val as Date)} 
          value={selectedDate} 
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              const hasMeeting = meetings.some(m => 
                new Date((m as any).startTime).toDateString() === date.toDateString()
              );
              return hasMeeting ? 'meeting-highlight' : null;
            }
          }}
        />
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
          {selectedDate.toDateString() === new Date().toDateString() 
            ? "Today's Meetings" 
            : selectedDate.toLocaleDateString()}
        </h3>
        
        <div className="space-y-3">
          {meetings
            .filter(m => new Date((m as any).startTime).toDateString() === selectedDate.toDateString())
            .map((meeting: any) => {
              const storedUser = localStorage.getItem('business_nexus_user');
              const user = storedUser ? JSON.parse(storedUser) : {};
              const isInvestor = user.role === 'investor'; 

              return (
                <div key={meeting._id} className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded-r-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900">{meeting.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-[10px] font-bold uppercase mt-1 text-blue-600">
                        Status: {meeting.status}
                      </p>
                    </div>

                    {isInvestor && meeting.status === 'pending' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(meeting._id, 'accept')}
                          className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(meeting._id, 'reject')}
                          className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {/* MILESTONE 4: VIDEO CALL BUTTON (Shows for both roles if status is accepted) */}
                    
                    {meeting.status === 'accepted' && (
                    <button
                     onClick={() => window.open(`/video-call/${meeting._id}`, '_blank')}
                     className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-1.5 shadow-sm border border-cyan-500/20"
                    >
                    Join Video Call
                    </button>
                    )}
                  </div>
                </div>
              );
            })}
          {meetings.filter(m => new Date((m as any).startTime).toDateString() === selectedDate.toDateString()).length === 0 && (
            <p className="text-gray-400 text-xs italic">No sessions scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
};