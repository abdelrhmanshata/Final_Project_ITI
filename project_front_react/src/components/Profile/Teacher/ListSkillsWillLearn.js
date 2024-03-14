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
          {skills.map((item) => (
            <>
              <p>{item.whatYoullLearnDescription}</p>
            </>
          ))}
        </>
      )}
      {/* {requirements.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`panel${item.id}-content`}
            id={`panel${item.id}-header`}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <Typography>{item.sectionName}</Typography>
              <div style={{ position: "absolute", top: 0, right: 0 }}>
                <AddVideo
                  sectionID={item.id}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                />

                <EditSection
                  section={item}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                />

                <DeleteSection
                  sectionID={item.id}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <ListVideo
              sectionID={item.id}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            />
          </AccordionDetails>
        </Accordion>
      ))} */}
    </div>
  );
};

export default ListSkillsWillLearn;
