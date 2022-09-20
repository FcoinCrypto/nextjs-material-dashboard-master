import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

export default function CustomTable(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  console.log("csffs",tableData)
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
          <TableBody>
            {Array.from(tableData.data).map((row) => (
              <TableRow key={row.attributes.date}>
                <TableCell align="left">{row.attributes.date}</TableCell>
                <TableCell align="left">{row.attributes.destinataire}</TableCell>
                <TableCell align="left">{row.attributes.description}</TableCell>
                <TableCell align="left">{row.attributes.expediteur}</TableCell>
                <TableCell align="left">{row.attributes.montant}</TableCell>
                <TableCell align="left">{row.attributes.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
