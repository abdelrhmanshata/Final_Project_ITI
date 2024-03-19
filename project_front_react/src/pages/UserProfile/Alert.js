import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios for making API requests
import './UserProfile.css';
 export default function ConfirmDialog ({ onConfirm, onCancel }){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  const handleConfirm = async () => {
    try {
      const result = await swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        
        cancelButtonText: 'No, cancel!',
        customClass: {
            confirmButton: "my-swal-confirm-button-class",
            cancelButton: "my-swal-cancel-button-class",
          },
       
        reverseButtons: true,
       
      });

      if (result.isConfirmed) {
     
        const response = await axios.delete('http://127.0.0.1:9000/user/Delete_User/<int:id>');
        

        if (response.status === 200) {
          onConfirm();
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Your account has been deleted.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          });
        } else {
          // Handle API error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to delete account!',
            confirmButtonColor: '#d33',
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel();
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: '#d33',
          color: 'white',
          fontSize: '20',
          padding: '5px',
          marginTop: '10px',
          width: '152px',
          fontFamily: 'Poppins',
        }}
        onClick={handleConfirm}
      >
        Delete Account
      </button>
    </div>
  );
};

