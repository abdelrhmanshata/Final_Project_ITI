import { ProgressBar } from "react-bootstrap";
import { FaDotCircle } from "react-icons/fa";
import { MdOutlineMore } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";

const paymentCourses = [
  {
    icon: require("../../../assets/img/react.jpg"),
    title: "React Material",
    budget: "2,500",
    status: "pending",
    students: [
      {
        image: require("../../../assets/img/team-0.jpg"),
        name: "AbdElrhman",
      },
      {
        image: require("../../../assets/img/team-2.jpg"),
        name: "Sara",
      },
      {
        image: require("../../../assets/img/team-3.jpg"),
        name: "Yosiff",
      },
      {
        image: require("../../../assets/img/team-4.jpg"),
        name: "Aisha",
      },
      {
        image: require("../../../assets/img/team-1.jpg"),
        name: "Mohamed",
      },
    ],
    completion: 60,
  },
  {
    icon: require("../../../assets/img/angular.jpg"),
    title: "Argon Design System",
    budget: "1,800 ",
    status: "completed",
    students: [
      {
        image: require("../../../assets/img/team-0.jpg"),
        name: "AbdElrhman",
      },
      {
        image: require("../../../assets/img/team-2.jpg"),
        name: "Sara",
      },
      {
        image: require("../../../assets/img/team-3.jpg"),
        name: "Yosiff",
      },
      {
        image: require("../../../assets/img/team-4.jpg"),
        name: "Aisha",
      },
      {
        image: require("../../../assets/img/team-1.jpg"),
        name: "Mohamed",
      },
    ],
    completion: 100,
  },
  {
    icon: require("../../../assets/img/bootstrap.jpg"),
    title: "Black",
    budget: "3,150",
    status: "pending",
    students: [
      {
        image: require("../../../assets/img/team-0.jpg"),
        name: "AbdElrhman",
      },
      {
        image: require("../../../assets/img/team-2.jpg"),
        name: "Sara",
      },
      {
        image: require("../../../assets/img/team-3.jpg"),
        name: "Yosiff",
      },
      {
        image: require("../../../assets/img/team-4.jpg"),
        name: "Aisha",
      },
      {
        image: require("../../../assets/img/team-1.jpg"),
        name: "Mohamed",
      },
    ],
    completion: 60,
  },
  {
    icon: require("../../../assets/img/sketch.jpg"),
    title: "Vue Paper UI Kit PRO",
    budget: "2,200",
    status: "pending",
    students: [
      {
        image: require("../../../assets/img/team-0.jpg"),
        name: "AbdElrhman",
      },
      {
        image: require("../../../assets/img/team-2.jpg"),
        name: "Sara",
      },
      {
        image: require("../../../assets/img/team-3.jpg"),
        name: "Yosiff",
      },
      {
        image: require("../../../assets/img/team-4.jpg"),
        name: "Aisha",
      },
      {
        image: require("../../../assets/img/team-1.jpg"),
        name: "Mohamed",
      },
    ],
    completion: 60,
  },
  {
    icon: require("../../../assets/img/react.jpg"),
    title: "React Material",
    budget: "2,500",
    status: "pending",
    students: [
      {
        image: require("../../../assets/img/team-0.jpg"),
        name: "AbdElrhman",
      },
      {
        image: require("../../../assets/img/team-2.jpg"),
        name: "Sara",
      },
      {
        image: require("../../../assets/img/team-3.jpg"),
        name: "Yosiff",
      },
      {
        image: require("../../../assets/img/team-4.jpg"),
        name: "Aisha",
      },
      {
        image: require("../../../assets/img/team-1.jpg"),
        name: "Mohamed",
      },
    ],
    completion: 60,
  },
  {
    icon: require("../../../assets/img/angular.jpg"),
    title: "Argon Design System",
    budget: "1,800 ",
    status: "completed",
    students: [
      {
        image: require("../../../assets/img/team-0.jpg"),
        name: "AbdElrhman",
      },
      {
        image: require("../../../assets/img/team-2.jpg"),
        name: "Sara",
      },
      {
        image: require("../../../assets/img/team-3.jpg"),
        name: "Yosiff",
      },
      {
        image: require("../../../assets/img/team-4.jpg"),
        name: "Aisha",
      },
      {
        image: require("../../../assets/img/team-1.jpg"),
        name: "Mohamed",
      },
    ],
    completion: 100,
  },
  {
    icon: require("../../../assets/img/bootstrap.jpg"),
    title: "Black",
    budget: "3,150",
    status: "pending",
    students: [
      {
        image: require("../../../assets/img/team-0.jpg"),
        name: "AbdElrhman",
      },
      {
        image: require("../../../assets/img/team-2.jpg"),
        name: "Sara",
      },
      {
        image: require("../../../assets/img/team-3.jpg"),
        name: "Yosiff",
      },
      {
        image: require("../../../assets/img/team-4.jpg"),
        name: "Aisha",
      },
      {
        image: require("../../../assets/img/team-1.jpg"),
        name: "Mohamed",
      },
    ],
    completion: 60,
  },
  {
    icon: require("../../../assets/img/sketch.jpg"),
    title: "Vue Paper UI Kit PRO",
    budget: "2,200",
    status: "pending",
    students: [
      {
        image: require("../../../assets/img/team-0.jpg"),
        name: "AbdElrhman",
      },
      {
        image: require("../../../assets/img/team-2.jpg"),
        name: "Sara",
      },
      {
        image: require("../../../assets/img/team-3.jpg"),
        name: "Yosiff",
      },
      {
        image: require("../../../assets/img/team-4.jpg"),
        name: "Aisha",
      },
      {
        image: require("../../../assets/img/team-1.jpg"),
        name: "Mohamed",
      },
    ],
    completion: 60,
  },
];

const Tables = () => {
  return (
    <>
      {/* Page content */}
      <Container className="mt-7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-5">
                <h3>Payment Table</h3>
              </CardHeader>
              <Table className="align-items-center">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Status</th>
                    <th scope="col">Students</th>
                    <th scope="col">Completion</th>
                  </tr>
                </thead>
                <tbody className="overflow-scroll align-items-center">
                  {paymentCourses.map((item, index) => (
                    <>
                      <tr key={index} className="align-items-center">
                        <th>
                          <a className="mr-3" href="/">
                            <img width={"40"} alt="..." src={item.icon} />
                            <span className="text-sm">{item.title}</span>
                          </a>
                        </th>
                        <td>${item.budget}EGP</td>
                        <td
                          style={{
                            color: item.completion === 100 ? "green" : "gray",
                          }}
                        >
                          <FaDotCircle
                            className="me-1"
                            style={{
                              color: item.completion === 100 ? "green" : "gray",
                            }}
                          />
                          {item.status}
                        </td>
                        <td>
                          <div className="d-flex ">
                            {item.students.map((student, index) => (
                              <>
                                <a
                                  key={index}
                                  style={{ marginLeft: "-8px", zIndex: "1" }}
                                  href="/"
                                >
                                  <img
                                    width={"30"}
                                    alt="..."
                                    className="rounded-circle"
                                    src={student.image}
                                  />
                                </a>
                              </>
                            ))}
                            <a
                              key={index}
                              style={{ marginLeft: "-8px" }}
                              href="/"
                            >
                              <MdOutlineMore
                                fontSize={30}
                                style={{ marginLeft: "8px" }}
                              />
                            </a>
                          </div>
                        </td>
                        <td>
                          <ProgressBar
                            now={item.completion}
                            label={`${item.completion}%`}
                          />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
