import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import {  DatePicker, Space } from "antd";
import 'antd/dist/antd.css';
import { confirmAchat } from "../../services/achat";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import { getUser } from "../../services/user";
import { updateWalletAriary } from "../../services/achat";
import { NumericFormat } from 'react-number-format';
export default function TableSuperAllAchats(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  moment.locale('fr')
  const  { tableHead, tableData, tableHeaderColor } = props;
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState(tableData);

  const requestSearch = (searchedVal) => {
    const filteredRows = tableData.filter((row) => {
      return row.attributes.user.data.attributes.username.toLowerCase().includes(searchedVal.toLowerCase()) || 
        row.attributes.status.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
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
  useEffect(async () => {

      // const res = await allAchats();
      // console.log(res)

  }, [])
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
              
              <TableRow>
                <TableCell align="left">{moment(row.attributes.createdAt).format("DD/MM/YY à HH:mm")}</TableCell>
                <TableCell align="left">{row.attributes.transaction?.data?.attributes.numeroTransaction}</TableCell>
                <TableCell align="left">{row.attributes.user.data.attributes.username}</TableCell>
                <TableCell align="left">{row.attributes.type}</TableCell>
                <TableCell align="left">
                  <NumericFormat value={row.attributes.montant} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} fixedDecimalScale />
                </TableCell>
                <TableCell align="left">{row.attributes.devis}</TableCell>
                <TableCell align="left">{row.attributes?.achat_mobile?.data?.attributes?.numeroTransaction}</TableCell>
                <TableCell align="left"><Button variant="contained" color="primary" style={{fontSize:'0.7rem', backgroundColor:row.attributes.status ==="Validé"?"green":"purple", color:"white", width:100}} disabled={row.attributes.status ==="Validé"?true:false} onClick={async()=>{
                  const id_user = row.attributes.user.data.id
                  const user = await getUser(id_user)
                  const id_wallet = user.data.wallet.id
                  const old_ariary = user.data.wallet.ariary
                  const ariary = row.attributes.montant + old_ariary;
                 // await updateWalletAriary(ariary,id_wallet)
                  await confirmAchat("ar",ariary,row.id)
                 // const status = await updateStatus(row.id)

                  //console.log(status.data.message)
                }}>{row.attributes.status}</Button></TableCell>
              </TableRow>
            )).reverse()}
          </TableBody>
      </Table>
    </div>
  );
}

TableSuperAllAchats.defaultProps = {
  tableHeaderColor: "gray",
};

TableSuperAllAchats.propTypes = {
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
