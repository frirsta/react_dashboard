import React, { useState, useEffect } from "react";
import styles from "../../styles/Table.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function TesterTable() {
  const [testerList, setTesterList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAccess = () => {
      const userrole =
        sessionStorage.getItem("userrole") != null
          ? sessionStorage.getItem("userrole").toString()
          : "";
      fetch(
        "http://localhost:8000/roleaccess/?role=" + userrole + "&menu=tester"
      )
        .then((res) => {
          if (!res.ok) {
            navigate("/");
            toast.warning("Staff page");
            return false;
          }
          return res.json();
        })
        .then((res) => {
          if (res.length > 0) {
          } else {
            navigate("/");
            toast.warning("Staff page");
          }
        });
    };

    const getTester = () => {
      fetch("http://localhost:8000/testobjects")
        .then((res) => {
          if (!res.ok) {
            return false;
          }
          return res.json();
        })
        .then((res) => {
          setTesterList(res);
        });
    };

    getUserAccess();
    getTester();
  }, [navigate]);

  const handleAdd = () => {
    // if (addAccess) {
    //   toast.success("Added");
    // } else {
    //   toast.warning("You don't have access to add");
    // }
  };
  const handleDelete = () => {
    // if (deleteAccess) {
    //   toast.success("Deleted");
    // } else {
    //   toast.warning("You don't have access to delete");
    // }
  };

  return (
    <div className={styles.Table}>
      <Link className="btn btn-success" to={"/addtest"} onClick={handleAdd}>
        <PersonAddIcon />
        Add
      </Link>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Caption</TableCell>

              <TableCell align="right">Deadline</TableCell>
              <TableCell align="right">Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testerList.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  <Link to={`/test/${item.id}`}>{item.id}</Link>
                </TableCell>
                <TableCell align="right">{item.caption}</TableCell>

                <TableCell align="right">{item.deadline}</TableCell>
                <TableCell align="right">{item.owner}</TableCell>
                <TableCell align="right">
                  <Button onClick={handleDelete} variant="outlined">
                    Delete
                    <DeleteIcon />
                  </Button>
                  <Link
                    to={`/edittester/` + item.id}
                  
                    variant="outlined"
                  >
                    Edit
                    <EditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
