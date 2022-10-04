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
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

export default function TableSuperAllEnvoyers(props) {
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
              <TableRow>
                <TableCell align="left">{row.attributes.createdAt}</TableCell>
                <TableCell align="left">{row.attributes.destinataire}</TableCell>
                <TableCell align="left">{row.attributes.etiquette}</TableCell>
                <TableCell align="left">{row.attributes.montant}</TableCell>
                <TableCell align="left">{row.attributes.user.data.attributes.username}</TableCell>
              </TableRow>
            )).reverse()}
          </TableBody>
      </Table>
    </div>
  );
}

TableSuperAllEnvoyers.defaultProps = {
  tableHeaderColor: "gray",
};

TableSuperAllEnvoyers.propTypes = {
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
