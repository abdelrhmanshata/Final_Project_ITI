import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function OrderItem({ payment, course }) {
  return (
    <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {course.courseName}
              </TableCell>
              <TableCell component="th" scope="row">
                1
              </TableCell>
              <TableCell component="th" scope="row">
                Check payments
              </TableCell>
              <TableCell component="th" scope="row">
                ${course.coursePrice}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
