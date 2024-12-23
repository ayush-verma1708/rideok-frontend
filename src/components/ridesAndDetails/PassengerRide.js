import React, { useState, useEffect } from 'react';
import { getRideDetails, handleRideRequest } from '../../api/rideApi'; // Assuming this API fetches ride data
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { getUserById } from '../../api/userApi'; // Import the API function to get user by ID

const PassengerRideInfo = ({ rideId }) => {
  const [ride, setRide] = useState(null); // State to hold ride details
  const [selectedPassenger, setSelectedPassenger] = useState(null); // State for selected passenger
  const [userDetails, setUserDetails] = useState({}); // State to hold user details (usernames)
  const [showToast, setShowToast] = useState(false); // Toast state for action feedback
  const [openApproveModal, setOpenApproveModal] = useState(false); // Modal for approval confirmation
  const [openRejectModal, setOpenRejectModal] = useState(false); // Modal for rejection confirmation
  const [loading, setLoading] = useState(false); // Loading state for fetching data

  const approveRequest = async (passengerId) => {
    try {
      const updatedRide = await handleRideRequest(
        rideId,
        'approve',
        passengerId
      );
      console.log('Ride updated:', updatedRide);
      // Update state or show a success message
    } catch (error) {
      console.error('Error approving ride:', error.message);
      // Show an error message
    }
  };

  const rejectRequest = async (passengerId) => {
    try {
      const updatedRide = await handleRideRequest(
        rideId,
        'reject',
        passengerId
      );
      console.log('Ride updated:', updatedRide);
      // Update state or show a success message
    } catch (error) {
      console.error('Error rejecting ride:', error.message);
      // Show an error message
    }
  };
  const fetchRideDetails = async () => {
    setLoading(true);
    try {
      const data = await getRideDetails(rideId); // API call to get ride data by rideId
      setRide(data);

      // Fetch user details for all passengers and requested riders
      const userDetailsMap = {};

      // Fetch user details for requested riders
      for (const request of data.customerRequests) {
        if (!userDetailsMap[request.user]) {
          const userData = await getUserById(request.user);
          userDetailsMap[request.user] = userData.name;
        }
      }

      // Fetch user details for approved passengers
      for (const passenger of data.passengers) {
        if (!userDetailsMap[passenger.user._id]) {
          const userData = await getUserById(passenger.user._id);
          userDetailsMap[passenger.user._id] = userData.name;
        }
      }

      setUserDetails(userDetailsMap);
    } catch (error) {
      console.error('Error fetching ride details:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch ride details including passengers when the component mounts

    fetchRideDetails();
  }, [rideId]);

  const handleApprove = async (requestId) => {
    setOpenApproveModal(false);
    try {
      setLoading(true);
      await approveRequest(requestId);
      setShowToast(true);
      setRide((prevRide) => ({
        ...prevRide,
        customerRequests: prevRide.customerRequests.filter(
          (req) => req._id !== requestId
        ),
      }));
    } catch (error) {
      console.error('Error approving request', error);
    } finally {
      setLoading(false);
    }
    fetchRideDetails();
  };

  const handleReject = async (requestId) => {
    setOpenRejectModal(false);
    try {
      setLoading(true);
      await rejectRequest(requestId);
      setShowToast(true);
      setRide((prevRide) => ({
        ...prevRide,
        customerRequests: prevRide.customerRequests.filter(
          (req) => req._id !== requestId
        ),
      }));
    } catch (error) {
      console.error('Error rejecting request', error);
    } finally {
      setLoading(false);
    }
    fetchRideDetails();
  };

  //   return (
  //     <div>
  //       <h2>Ride Passenger Information</h2>

  //       {/* Snackbar for action feedback */}
  //       <Snackbar
  //         open={showToast}
  //         autoHideDuration={6000}
  //         onClose={() => setShowToast(false)}
  //         message='Request action completed successfully!'
  //       />

  //       {/* Display Requested Riders */}
  //       <h3>Requested Riders</h3>
  //       {loading ? (
  //         <CircularProgress />
  //       ) : ride && ride.customerRequests && ride.customerRequests.length > 0 ? (
  //         <TableContainer>
  //           <Table>
  //             <TableHead>
  //               <TableRow>
  //                 <TableCell>Name</TableCell>
  //                 <TableCell>Phone Number</TableCell>
  //                 <TableCell>Location</TableCell>
  //                 <TableCell>Approval Status</TableCell>
  //                 <TableCell>Action</TableCell>
  //               </TableRow>
  //             </TableHead>
  //             <TableBody>
  //               {ride.customerRequests.map((request, index) => (
  //                 <TableRow key={index}>
  //                   <TableCell>
  //                     {userDetails[request.user] || 'Loading...'}
  //                   </TableCell>
  //                   <TableCell>{request.phoneNumber}</TableCell>
  //                   <TableCell>{request.location}</TableCell>
  //                   <TableCell>
  //                     {request.approval ? 'Approved' : 'Pending'}
  //                   </TableCell>
  //                   <TableCell>
  //                     <Button
  //                       variant='contained'
  //                       color='primary'
  //                       onClick={() => {
  //                         setSelectedPassenger(request);
  //                         setOpenApproveModal(true);
  //                       }}
  //                     >
  //                       Approve
  //                     </Button>
  //                     <Button
  //                       variant='contained'
  //                       color='secondary'
  //                       onClick={() => {
  //                         setSelectedPassenger(request);
  //                         setOpenRejectModal(true);
  //                       }}
  //                     >
  //                       Reject
  //                     </Button>
  //                   </TableCell>
  //                 </TableRow>
  //               ))}
  //             </TableBody>
  //           </Table>
  //         </TableContainer>
  //       ) : (
  //         <p>No requested riders found.</p>
  //       )}

  //       {/* Approve Modal */}
  //       <Dialog
  //         open={openApproveModal}
  //         onClose={() => setOpenApproveModal(false)}
  //       >
  //         <DialogTitle>Approve Rider?</DialogTitle>
  //         <DialogContent>
  //           Are you sure you want to approve this rider for the ride?
  //         </DialogContent>
  //         <DialogActions>
  //           <Button onClick={() => setOpenApproveModal(false)} color='primary'>
  //             Cancel
  //           </Button>
  //           <Button
  //             onClick={() => handleApprove(selectedPassenger.user)}
  //             color='primary'
  //           >
  //             Confirm
  //           </Button>
  //         </DialogActions>
  //       </Dialog>

  //       {/* Reject Modal */}
  //       <Dialog open={openRejectModal} onClose={() => setOpenRejectModal(false)}>
  //         <DialogTitle>Reject Rider?</DialogTitle>
  //         <DialogContent>
  //           Are you sure you want to reject this rider's request?
  //         </DialogContent>
  //         <DialogActions>
  //           <Button onClick={() => setOpenRejectModal(false)} color='primary'>
  //             Cancel
  //           </Button>
  //           <Button
  //             onClick={() => handleReject(selectedPassenger.user)}
  //             color='secondary'
  //           >
  //             Confirm
  //           </Button>
  //         </DialogActions>
  //       </Dialog>
  //     </div>
  //   );
  // };
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2
        style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}
      >
        Ride Information
      </h2>

      {/* Snackbar for action feedback */}
      <Snackbar
        open={showToast}
        autoHideDuration={6000}
        onClose={() => setShowToast(false)}
        message='Request action completed successfully!'
      />

      {/* Requested Riders Table */}
      {loading ? (
        <CircularProgress />
      ) : ride && ride.customerRequests.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '14px' }}>Name</TableCell>
                <TableCell style={{ fontSize: '14px' }}>Location</TableCell>
                <TableCell style={{ fontSize: '14px' }}>Phone number</TableCell>
                <TableCell style={{ fontSize: '14px' }}>Status</TableCell>
                <TableCell style={{ fontSize: '14px' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ride.customerRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontSize: '14px' }}>
                    {userDetails[request.user] || 'Loading...'}
                  </TableCell>
                  <TableCell style={{ fontSize: '14px' }}>
                    {request.location}
                  </TableCell>
                  <TableCell style={{ fontSize: '14px' }}>
                    {request.phoneNumber}
                  </TableCell>
                  <TableCell style={{ fontSize: '14px' }}>
                    {request.approval ? 'Approved' : 'Pending'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      color='primary'
                      size='small'
                      onClick={() => {
                        setSelectedPassenger(request);
                        setOpenApproveModal(true);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant='outlined'
                      color='secondary'
                      size='small'
                      onClick={() => {
                        setSelectedPassenger(request);
                        setOpenRejectModal(true);
                      }}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p style={{ textAlign: 'center', color: 'gray' }}>
          No requested riders found.
        </p>
      )}

      {/* Approve Modal */}
      <Dialog
        open={openApproveModal}
        onClose={() => setOpenApproveModal(false)}
      >
        <DialogTitle>Approve Rider?</DialogTitle>
        <DialogContent>
          Are you sure you want to approve this rider for the ride?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApproveModal(false)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => handleApprove(selectedPassenger.user)}
            color='primary'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={openRejectModal} onClose={() => setOpenRejectModal(false)}>
        <DialogTitle>Reject Rider?</DialogTitle>
        <DialogContent>
          Are you sure you want to reject this rider's request?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectModal(false)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => handleReject(selectedPassenger.user)}
            color='secondary'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PassengerRideInfo;
