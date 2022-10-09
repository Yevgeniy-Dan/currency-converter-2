import React from "react";
import { Link } from "react-router-dom";

import Converter from "../components/Converter";
import classes from "../modules/css/App.module.css";

const ConverterPage: React.FC = () => {
  return (
    <div className={`${classes.form} ${classes.mainContainer}`}>
      <Converter />
      <div className={classes.nextPageBtnContainer}>
        <Link to="/currency-list" state={{}}>
          Next Page
        </Link>
      </div>
    </div>
  );
};

export default ConverterPage;
