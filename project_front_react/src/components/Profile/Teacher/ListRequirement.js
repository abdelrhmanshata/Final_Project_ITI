import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";

const ListRequirement = ({ courseId }) => {
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
  }, []);

  return (
    <div>
      {requirements.length > 0 && (
        <>
          <h5>Requirement</h5>
          {requirements.map((item, index) => (
            <div key={index}>
              <li>{item.requirementDescription}</li>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListRequirement;
