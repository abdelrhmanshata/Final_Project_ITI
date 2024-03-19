import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { MdOutlineDeleteForever } from "react-icons/md";
import { updateState } from "store/slices/update";

const ListSkillsWillLearn = ({ courseId }) => {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));

  const [skills, setSkills] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/${courseId}/getAllWhatYoullLearns/`)
        .then((res) => {
          if (typeof res.data.message != "string") {
            setSkills(res.data.message);
          } else {
            setSkills([]);
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

  const deleteSkills = async (id) => {
    try {
      await axiosInstance
        .delete(`/course/deleteAWhatYoullLearn/${id}`)
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
      {skills.length > 0 && (
        <>
          <h5>Skills Will You Learn</h5>
          {skills.map((item, index) => (
            <div key={index} className="row" style={{ alignItems: "center" }}>
              <li className="col-10">{item.whatYoullLearnDescription}</li>
              <IconButton className="col-2" edge="end" aria-label="delete">
                <MdOutlineDeleteForever
                  color="red"
                  onClick={() => {
                    deleteSkills(item.id);
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

export default ListSkillsWillLearn;
