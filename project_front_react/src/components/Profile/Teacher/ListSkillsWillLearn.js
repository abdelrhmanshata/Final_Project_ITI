import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";

const ListSkillsWillLearn = ({ courseId }) => {
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
  }, []);

  return (
    <div>
      {skills.length > 0 && (
        <>
          <h5>Skills Will You Learn</h5>
          {skills.map((item, index) => (
            <div key={index}>
              <li>{item.whatYoullLearnDescription}</li>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListSkillsWillLearn;
