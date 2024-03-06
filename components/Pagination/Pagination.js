import React, { useState, useEffect } from "react";
/* @ts-ignore TODO: Refactor link to address type error */
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  stack: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  
}));


const Paginator = ({ totalCount, changePage, currentPage, itemsPerPage, setItemsPerPage }) => {
  const [maxPage, setMaxPage] = useState(0);
  currentPage = Math.floor(currentPage / itemsPerPage) + 1;
  console.log("current page is ", currentPage);
  console.log("max page is ", maxPage);
  /* @ts-ignore TODO: Refactor link to address type error */
  const handlePageClick = (pageNum) => {
    console.log("page num is ", pageNum, currentPage, maxPage);
    /* @ts-ignore TODO: Refactor link to address type error */
    changePage((pageNum - 1) * itemsPerPage)
  };
  useEffect(() => {
    console.log("total", totalCount, "current", currentPage, "items per page", itemsPerPage)
    setMaxPage(Math.ceil(totalCount / itemsPerPage));
  }, [totalCount]);

  const classes = useStyles();
  

  return (
    <>
      <div className={classes.stack}>
          <Pagination
            count={maxPage}
            page={currentPage}
            onChange={(e, value) => {
              handlePageClick(value);
            }}
          />
      </div>
    </>
  );
};
export default Paginator;
