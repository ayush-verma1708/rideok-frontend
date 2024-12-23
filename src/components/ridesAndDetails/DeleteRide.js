import React, { useState } from 'react';
import { updateRide } from '../../api/rideApi';
import { Button, Modal } from 'react-bootstrap';

const ExpireRide = ({ rideId }) => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Function to handle the update after confirmation
  const handleExpire = async () => {
    const updatedData = { isExpired: true }; // Data to update the ride

    try {
      // Call the updateRide API to set isExpired to true
      const updatedRide = await updateRide(rideId, updatedData);
      console.log('Ride expired successfully:', updatedRide);
      setShowModal(false); // Close modal after updating
    } catch (error) {
      console.error('Error expiring ride:', error);
    }
  };

  // Function to handle modal visibility
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      {/* Button to trigger modal */}
      <Button onClick={handleShowModal} variant='warning'>
        Delete Ride
      </Button>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Expiration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this ride as expired? This action cannot
          be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant='warning' onClick={handleExpire}>
            Delete Ride
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpireRide;

// import React, { useState } from 'react';
// import { updateRide } from '../../api/rideApi';
// import { Button, Modal } from 'react-bootstrap';

// const DeleteRide = ({ rideId }) => {
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility

//   // Function to handle the deletion after confirmation
//   const handleDelete = async () => {
//     try {
//       const deletedRide = await updateRide(rideId);
//       console.log('Ride deleted successfully:');
//       setShowModal(false); // Close modal after deletion
//     } catch (error) {
//       console.error('Error deleting ride:', error);
//     }
//   };

//   // Function to handle modal visibility
//   const handleCloseModal = () => setShowModal(false);
//   const handleShowModal = () => setShowModal(true);

//   return (
//     <>
//       {/* Button to trigger modal */}
//       <Button onClick={handleShowModal} variant='danger'>
//         Delete Ride
//       </Button>

//       {/* Confirmation Modal */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete this ride? This action cannot be
//           undone.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant='secondary' onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button variant='danger' onClick={handleDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default DeleteRide;
// // import React from 'react';
// // import { deleteRide } from '../../api/rideApi';
// // import { Button } from 'react-bootstrap';

// // const DeleteRide = ({ rideId }) => {
// //   const handleDelete = async () => {
// //     try {
// //       const deletedRide = await deleteRide(rideId);
// //       console.log('Ride deleted successfully:', deletedRide);
// //     } catch (error) {
// //       console.error('Error deleting ride:', error);
// //     }
// //   };

// //   return (
// //     <Button onClick={handleDelete} variant='danger'>
// //       Delete Ride
// //     </Button>
// //   );
// // };

// // export default DeleteRide;
