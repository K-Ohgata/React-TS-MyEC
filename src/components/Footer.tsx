import React from "react"
import { makeStyles, createStyles } from '@material-ui/styles';


export const Footer:React.FC = () => {
  const classes = useStyle()
  return (
    <footer className={classes.footer}>
      <div>
        React_EC (TS ver.) Created by Ohgata in 10/2021
      </div>
    </footer>
  )
}

const useStyle = makeStyles(() =>
  createStyles({
    "footer": {
      backgroundColor: "#8e7361",
      color:"#320c08",
      height: "50px",
      width:"100%",
      bottom: 0,  //下に固定
      marginTop:"auto",

      //上下左右中央揃えのやり方
      display:"flex",  //親要素をflexにしてあげる
      justifyContent: "center",  //縦方向の中央
      alignItems: "center",  //横方向の中央
    },
  })
)