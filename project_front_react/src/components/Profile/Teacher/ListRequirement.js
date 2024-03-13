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
          {requirements.map((item) => (
            <>
              <p>{item.requirementDescription}</p>
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

export default ListRequirement;
