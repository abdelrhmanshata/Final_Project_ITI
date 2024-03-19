import React from "react";
import Swal from "sweetalert2";

import "./UserProfile.css";
import { axiosInstance } from "api/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";
export default function ConfirmDialog({ onConfirm, onCancel }) {
  const navigate = useNavigate();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  const dispatch = useDispatch();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const logout = () => {
    navigate(`/`);
    localStorage.setItem("User_ID", "");
    localStorage.setItem("isAdmin", "");
    localStorage.setItem("User_JWT", "");
    localStorage.setItem("User_Type", "");
    dispatch(updateState(isUpdate + 1));
    window.location.reload();
  };

  const handleConfirm = async () => {
    try {
      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",

        cancelButtonText: "No, cancel!",
        customClass: {
          confirmButton: "my-swal-confirm-button-class",
          cancelButton: "my-swal-cancel-button-class",
        },

        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await axiosInstance.delete(
          `user/Delete_User/${localStorage.getItem("User_ID")}`
        );

        if (response.status === 200) {
          onConfirm();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          logout();
        } else {
          // Handle API error
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to delete account!",
            confirmButtonColor: "#d33",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel();
        Swal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "#d33",
          color: "white",
          fontSize: "20",
          padding: "5px",
          marginTop: "10px",
          width: "152px",
          fontFamily: "Poppins",
        }}
        onClick={handleConfirm}
      >
        Delete Account
      </button>
    </div>
  );
}
