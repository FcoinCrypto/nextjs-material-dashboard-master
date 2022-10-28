import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { NumericFormat } from 'react-number-format';

// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

export default function CustomTable(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  moment.locale('fr')
  const  { tableHead, tableData, tableHeaderColor } = props;
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
            {tableData.map((row) => (
              <TableRow key={row.attributes.createdAt}>
                <TableCell align="left">{moment(row.attributes.createdAt).format("DD/MM/YY à HH:mm")}</TableCell>
                <TableCell align="left">
                  <NumericFormat value={row.attributes.montant} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} fixedDecimalScale />
                </TableCell>                <TableCell align="left">{row.attributes.type == "Transfert"?"Ftc":"Ariary"}</TableCell>
                <TableCell align="left">{row.attributes.numeroTransaction}</TableCell>
                <TableCell align="left">{row.attributes.type}</TableCell>
              </TableRow>
            )).reverse()}
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
