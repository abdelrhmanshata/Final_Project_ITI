import React from 'react';
import Swal from 'sweetalert2';
import './UserProfile.css'
const ConfirmDialog = ({ onConfirm, onCancel }) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    
    },
    buttonsStyling: false
  });

  const handleConfirm = () => {
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: '#3085d6',
      cancelButtonText: "No, cancel!",
      cancelButtonColor: '#d33',
      reverseButtons: true,
      customClass: {
       
        confirmButton: 'my-swal-confirm-button-class', 
        cancelButton: 'my-swal-cancel-button-class', 
      },
      
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(); 
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: '#3085d6'
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel(); 
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
          confirmButtonColor: '#d33'
        });
      }
    });
  };

  return (
    <div>
    <button   style={{ backgroundColor: ' #d33', color: 'white',fontSize:'20',padding:'5px',marginTop:'10px',width:'152px', fontFamily: "Poppins"}} onClick={handleConfirm}>Delete Account</button>

      </div>
  );
};

export default ConfirmDialog;
