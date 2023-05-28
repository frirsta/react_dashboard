import React from "react";
import styles from "../styles/Testers.module.css";
import TesterTable from "./TesterTable";

const Tester = () => {


  return (
    <div>
      <h2 className={styles.Title}>Tester list</h2>
   <TesterTable />
    </div>
  );
};

export default Tester;
