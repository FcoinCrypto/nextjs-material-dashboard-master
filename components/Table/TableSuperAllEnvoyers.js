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
import { Button } from "@material-ui/core";
import { updateStatus } from "../../services/envoyer";
import { updateWallet } from "../../services/envoyer";
import { getUser } from "../../services/user";
import {  DatePicker, Space } from "antd";

import 'antd/dist/antd.css';
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

export default function TableSuperAllEnvoyers(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  moment.locale('fr')
  const  { tableHead, tableData, tableHeaderColor } = props;
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState(tableData);

  const requestSearch = (searchedVal) => {
    const filteredRows = tableData.filter((row) => {
      return row.attributes.destinataire.toLowerCase().includes(searchedVal.toLowerCase()) || 
        row.attributes.etiquette.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.attributes.user.data.attributes.username.toLowerCase().includes(searchedVal.toLowerCase());
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
                <TableCell align="left">{row.attributes.user.data.attributes.username}</TableCell>
                <TableCell align="left">{row.attributes.destinataire}</TableCell>
                <TableCell align="left">{row.attributes.montantDepart}</TableCell>
                <TableCell align="left">{row.attributes.devise}</TableCell>
                <TableCell align="left">{row.attributes.montantArrive}</TableCell>
                <TableCell align="left">{row.attributes.devise}</TableCell>
                <TableCell align="left"><Button variant="contained" color="primary" style={{fontSize:'0.7rem', backgroundColor:row.attributes.status ==="Validé"?"green":"purple", color:"white", width:100}} disabled={row.attributes.status ==="Validé"?true:false} onClick={async()=>{
                  const id_user = row.attributes.user.data.id
                  const id_dest = row.attributes.users_destinataire.data.id
                  const user = await getUser(id_user)
                  const dest = await getUser(id_dest)
                  const id_wallet_user = user.data.wallet.id
                  const id_wallet_dest = dest.data.wallet.id
                  const user_old_ftc = user.data.wallet.ftc
                  const dest_old_ftc = dest.data.wallet.ftc
                  console.log(user_old_ftc)
                  console.log(dest_old_ftc)
                  const wallet_user = user_old_ftc - row.attributes.montantDepart
                  const wallet_dest = dest_old_ftc + row.attributes.montantArrive
                  
                  await updateWallet(wallet_user,id_wallet_user)
                  await updateWallet(wallet_dest,id_wallet_dest)
                  // const ariary = row.attributes.montant + old_ariary;
                 // await updateWalletAriary(ariary,id_wallet)
                  // await confirmAchat("ar",ariary,row.id)
                 //const status = await updateStatus(row.id,row.attributes.montantDepart)

                  //console.log(status.data.message)
                }}>{row.attributes.status}</Button></TableCell>
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
