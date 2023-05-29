import React, { useState, useEffect } from "react";
import styles from "../styles/Table.module.css";
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
  const [editAccess, setEditAccess] = useState(false);
  const [viewAccess, setViewAccess] = useState(false);
  const [addAccess, setAddAccess] = useState(false);
  const [deleteAccess, setDeleteAccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserAccess = () => {
      const userrole =
        sessionStorage.getItem("userrole") != null
          ? sessionStorage.getItem("userrole").toString()
          : "";
      fetch(
        "http://localhost:8000/roleaccess/?role=" + userrole + "&menu=customer"
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
            setViewAccess(true);
            let userObject = res[0];
            setEditAccess(userObject.editAccess);
            setAddAccess(userObject.addAccess);
            setDeleteAccess(userObject.deleteAccess);
         
          } else {
            navigate("/");
            toast.warning("Staff page");
          }
        });
    };

    const getTester = () => {
      fetch("http://localhost:8000/users?role=tester")
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
  }, [navigate, viewAccess]);

  const handleAdd = () => {
    if (addAccess) {
      toast.success("Added");
    } else {
      toast.warning("You don't have access to add");
    }
  };
  const handleDelete = () => {
    if (deleteAccess) {
      toast.success("Deleted");
    } else {
      toast.warning("You don't have access to delete");
    }
  };
  const handleEdit = () => {
    if (editAccess) {
      toast.success("Edited");
    } else {
      toast.warning("You don't have access to edit");
    }
  };
  return (
    <div className={styles.Table}>
      <Link className="btn btn-success" to={"/create"} onClick={handleAdd}>
        <PersonAddIcon />
        Add
      </Link>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testerList.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
               <Link to={`/tester/${item.id}`}>{item.id}</Link>
                </TableCell>
                <TableCell align="right">{item.firstName}</TableCell>
                <TableCell align="right">{item.lastName}</TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">{item.role}</TableCell>
                <TableCell align="right">
                  <Button onClick={handleDelete} variant="outlined">
                    Delete
                    <DeleteIcon />
                  </Button>
                  <Link
                    to={`/edittester/` + item.id}
                    onClick={handleEdit}
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
