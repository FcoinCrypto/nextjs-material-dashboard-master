import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getUser } from "../../services/user";
import { walletAtom } from "../../recoil/atom/walletAtom";
import { authAtom } from "../../recoil/atom/authAtom";

function Tableau() {
  const [wallet, setWallet] = useState();
  const { user } = useRecoilValue(authAtom);

  useEffect(async () => {
    if (!wallet) {
      const data = await getUser(user.id);
      console.log(data)
      setWallet(data.data.wallet.fcoin);
    }
  }, [wallet])

  return (
    <>
        <div><b>ACHETER DES FCOINS</b></div>
        <center><p> Vous détenez actuellement : <strong> { wallet } Fcoin </strong><br/>  Entrez le montant de Fcoin que vous souhaitez acheter ou le montant en EUR que vous souhaitez dépenser</p></center>
 
    </>
  )
}

Tableau.layout = Admin;

export default Tableau;