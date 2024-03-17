import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { MdOutlineDeleteForever } from "react-icons/md";
import { updateState } from "store/slices/update";

const ListRequirement = ({ courseId }) => {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));
  const [requirements, setRequirements] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/${courseId}/getAllRequirements/`)
        .then((res) => {
          if (typeof res.data.message != "string")
            setRequirements(res.data.message);
          else {
            setRequirements([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [courseId]);

  useEffect(() => {
    getData();
  }, [isUpdate]);

  const deleteRequirement = async (id) => {
    try {
      await axiosInstance
        .delete(`/course/deleteARequirement/${id}`)
        .then((res) => {
          dispatch(updateState(isUpdate + 1));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {requirements.length > 0 && (
        <>
          <h5>Requirement</h5>
          {requirements.map((item, index) => (
            <div key={index} className="row" style={{ alignItems: "center" }}>
              <li className="col-10">{item.requirementDescription}</li>
              <IconButton className="col-2" edge="end" aria-label="delete">
                <MdOutlineDeleteForever
                  color="red"
                  onClick={() => {
                    deleteRequirement(item.id);
                  }}
                />
              </IconButton>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListRequirement;
