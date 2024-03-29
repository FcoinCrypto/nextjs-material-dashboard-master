import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import SearchBar from "material-ui-search-bar";
import {  DatePicker, Space } from "antd";
import 'antd/dist/antd.css';
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

export default function TableSuperTransaction(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  moment.locale('fr')
  const  { tableHead, tableData, tableHeaderColor } = props;
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState(tableData);

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.attributes.user.data.attributes.username.toLowerCase().includes(searchedVal.toLowerCase()) || 
        row.attributes.etiquette.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.attributes.type.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
    if(!searchedVal){
      handleResetDate();
      setRows(tableData);
    } 
  };

  const handleSearchDate = (dateFilter) => {
    const filteredRows = rows.filter((row) => {
      return moment(row.attributes.createdAt).format("YYYY-MM-DD").includes(dateFilter)
    });
    setRows(filteredRows);
    // setFilterDate(dateFilter);
  };

  const handleResetDate = () => {
    setRows(tableData);
  };

  const cancelSearch = () => {
    setRows(tableData);
    setSearched("");
  };

  return (
    <div className={classes.tableResponsive}>
      <div style={{ padding: 8 }}>
        <Space direction="vertical">
          <DatePicker
            format={"DD/MM/YY"}
            onChange={(e) => {
              e ? handleSearchDate(e.format("YYYY-MM-DD")) : handleResetDate();
            }}
          />
        </Space>
      </div>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
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
            {rows.map((row) => (
              <TableRow key={row.attributes.createdAt}>
                <TableCell align="left">{moment(row.attributes.createdAt).format("DD/MM/YY à HH:mm")}</TableCell>
                <TableCell align="left">{row.attributes.user.data.id}</TableCell>
                <TableCell align="left">{row.attributes.user.data.attributes.username}</TableCell>
                <TableCell align="left">{row.attributes.type}</TableCell>
                <TableCell align="left">{row.attributes.montant}</TableCell>
                <TableCell align="left">{row.attributes.type == "Achat"?"Ariary":"Ftc"}</TableCell>
                <TableCell align="left">{row.attributes.numeroTransaction}</TableCell>
              </TableRow>
            )).reverse()}
          </TableBody>
      </Table>
    </div>
  );
}

TableSuperTransaction.defaultProps = {
  tableHeaderColor: "gray",
};

TableSuperTransaction.propTypes = {
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
