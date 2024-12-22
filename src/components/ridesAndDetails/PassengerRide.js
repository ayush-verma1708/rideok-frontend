import React, { useState, useEffect } from 'react';
import { getRideDetails } from '../../api/rideApi'; // Assuming this API fetches ride data
import { Table, Button, Modal, Spinner, Toast } from 'react-bootstrap';
import { getUserById } from '../../api/userApi'; // Import the API function to get user by ID

const PassengerRideInfo = ({ rideId }, approveRequest, rejectRequest) => {
  const [ride, setRide] = useState(null); // State to hold ride details
  const [showModal, setShowModal] = useState(false); // Modal state for passenger info
  const [selectedPassenger, setSelectedPassenger] = useState(null); // State for selected passenger
  const [userDetails, setUserDetails] = useState({}); // State to hold user details (usernames)
  const [showToast, setShowToast] = useState(false); // Toast state for action feedback

  useEffect(() => {
    // Fetch ride details including passengers when the component mounts
    const fetchRideDetails = async () => {
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
      }
    };

    fetchRideDetails();
  }, [rideId]);

  // Function to handle modal visibility
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (passenger) => {
    setSelectedPassenger(passenger);
    setShowModal(true);
  };

  // Handle approval of a request
  const handleApprove = async (requestId) => {
    try {
      // Call API to approve request (implement approveRequest function in your API)
      await approveRequest(requestId);
      setShowToast(true); // Show success toast
      // Optionally refresh the ride details or re-fetch data
      setRide((prevRide) => ({
        ...prevRide,
        customerRequests: prevRide.customerRequests.filter(
          (req) => req._id !== requestId
        ),
      }));
    } catch (error) {
      console.error('Error approving request', error);
    }
  };

  // Handle rejection of a request
  const handleReject = async (requestId) => {
    try {
      // Call API to reject request (implement rejectRequest function in your API)
      await rejectRequest(requestId);
      setShowToast(true); // Show success toast
      // Optionally refresh the ride details or re-fetch data
      setRide((prevRide) => ({
        ...prevRide,
        customerRequests: prevRide.customerRequests.filter(
          (req) => req._id !== requestId
        ),
      }));
    } catch (error) {
      console.error('Error rejecting request', error);
    }
  };

  return (
    <div>
      <h2>Ride Passenger Information</h2>

      {/* Toast for action feedback */}
      <Toast show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Body>Request action completed successfully!</Toast.Body>
      </Toast>

      {/* Display Requested Riders */}
      <h3>Requested Riders</h3>
      {ride && ride.customerRequests && ride.customerRequests.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Approval Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ride.customerRequests.map((request, index) => (
              <tr key={index}>
                <td>
                  {userDetails[request.user] || (
                    <Spinner animation='border' size='sm' />
                  )}
                </td>
                <td>{request.phoneNumber}</td>
                <td>{request.location}</td>
                <td>{request.approval ? 'Approved' : 'Pending'}</td>
                <td>
                  <Button
                    variant='success'
                    onClick={() => handleApprove(request._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No requested riders found.</p>
      )}

      {/* Display Approved Passengers */}
      <h3>Approved Passengers</h3>
      {ride && ride.passengers && ride.passengers.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {ride.passengers.map((passenger, index) => (
              <tr key={index}>
                <td>
                  {userDetails[passenger.user._id] || (
                    <Spinner animation='border' size='sm' />
                  )}
                </td>
                <td>{passenger.phoneNumber}</td>
                <td>{passenger.location}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No approved passengers found.</p>
      )}

      {/* Modal to show more details of a selected rider */}
      {selectedPassenger && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Passenger Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Name:</strong>{' '}
              {userDetails[selectedPassenger.user] || 'Loading...'}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedPassenger.phoneNumber}
            </p>
            <p>
              <strong>Location:</strong> {selectedPassenger.location}
            </p>
            {/* Additional details can be added here */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PassengerRideInfo;

// import React, { useState, useEffect } from 'react';
// import { getRideDetails } from '../../api/rideApi'; // Assuming this API fetches ride data
// import { Table, Button, Modal } from 'react-bootstrap';
// import { getUserById } from '../../api/userApi'; // Import the API function to get user by ID

// const PassengerRideInfo = ({ rideId }) => {
//   const [ride, setRide] = useState(null); // State to hold ride details
//   const [showModal, setShowModal] = useState(false); // Modal state for passenger info
//   const [selectedPassenger, setSelectedPassenger] = useState(null); // State for selected passenger
//   const [userDetails, setUserDetails] = useState({}); // State to hold user details (usernames)

//   useEffect(() => {
//     // Fetch ride details including passengers when the component mounts
//     const fetchRideDetails = async () => {
//       try {
//         const data = await getRideDetails(rideId); // API call to get ride data by rideId
//         setRide(data);
//         // Fetch user details for all passengers and requested riders
//         const userDetailsMap = {};

//         // Fetch user details for requested riders
//         for (const request of data.customerRequests) {
//           if (!userDetailsMap[request.user]) {
//             const userData = await getUserById(request.user);
//             userDetailsMap[request.user] = userData.name;
//           }
//         }

//         setUserDetails(userDetailsMap);
//       } catch (error) {
//         console.error('Error fetching ride details:', error);
//       }
//     };

//     fetchRideDetails();
//   }, [rideId]);

//   // Function to handle modal visibility
//   const handleCloseModal = () => setShowModal(false);
//   const handleShowModal = (passenger) => {
//     setSelectedPassenger(passenger);
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <h2>Ride Passenger Information</h2>

//       {/* Display Requested Riders */}
//       <h3>Requested Riders</h3>
//       {ride && ride.customerRequests && ride.customerRequests.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Phone Number</th>
//               <th>Location</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ride.customerRequests.map((request, index) => (
//               <tr key={index}>
//                 <td>{userDetails[request.user] || 'Loading...'}</td>{' '}
//                 {/* Display the name fetched */}
//                 <td>{request.phoneNumber}</td>
//                 <td>{request.location}</td>
//                 <td>
//                   <Button
//                     variant='info'
//                     onClick={() => handleShowModal(request)}
//                   >
//                     View Details
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No requested riders found.</p>
//       )}
//     </div>
//   );
// };

// export default PassengerRideInfo;
