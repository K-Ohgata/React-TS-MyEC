import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { makeStyles, createStyles } from '@material-ui/styles';
import { User } from '../components/App'

const loginSelector = (state: any) => state.store.loginUser
const coffeeSelector = (state: any) => state.store.coffee
const cartSelector = (state: any) => state.store.cart

export const History: React.FC = () => {
  const classes = useStyle()

  const [history, setHistory] = useState<firebase.firestore.DocumentData>([])

  const login: User = useSelector(loginSelector)
  const coffee: Coffee = useSelector(coffeeSelector)

  type Coffee = {
    id: number,
    name: string,
    detail: string,
    lsizePrice: number,
    msizePrice: number,
    pic: string
  }[]

  type CartType = {
    id: string,
    userName: string,
    address: string,
    addressNumber: string,
    phoneNumber: string,
    cartItemList: {
      id: number,
      quantity: number,
      total: number,
      size: string,
      topping: string[]
    }[],
    mailAddress: string,
    deliveryDate: string,
    deliveryTime: string,
    orderDate: string,
    status: number,
  }

  useEffect(() => {
    let done: firebase.firestore.DocumentData = []
    firebase
      .firestore()
      .collection(`users/${login.uid}/carts`)
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().status !== 0) {
            done.push(doc.data())
          }
        })
        setHistory(done)
      })
  }, [])

  type HistoryData = {
    price: number,
    coffee: string[],
    orderDate: string
  }[]

  const setCafe = () => {
    let historyData:HistoryData= []
    history.forEach((cart: CartType) => {
      let totalPrice = 0
      let coffeeName: string[] = []
      cart.cartItemList.forEach((cafe) => {
        totalPrice += cafe.total
        for (let i = 0; i < coffee.length; i++) {
          if (coffee[i].id === cafe.id) {
            coffeeName.push(coffee[i].name)
          }
        }
      })
      historyData.push({ price: totalPrice, coffee: coffeeName, orderDate: cart.orderDate })
      totalPrice = 0
      coffeeName = []
    })
    return historyData
  }

  const displayHistory = () => {
    const cafeArray = setCafe()
    cafeArray.sort((a, b) => {
      return Number(new Date(b.orderDate)) - Number(new Date(a.orderDate))
    })
    return (
      cafeArray.map((item) => {
        return (
          <tr className={classes.items}>
            <td>{item.orderDate}</td>
            <td>{item.coffee.map((cafe) => {
              return <div>{cafe}</div>
            })}</td>
            <td>{item.price}</td>
          </tr>
        )
      })
    )
  }

  return (
    <div className={classes.body}>
      <table className={classes.table}>
        <tr className={classes.title}>
          <th>購入日時</th>
          <th>購入商品</th>
          <th>合計金額</th>
        </tr>
        {displayHistory()}
      </table>
    </div>
  )
}

const useStyle = makeStyles(() =>
  createStyles({
    "body": {
      paddingTop: "100px", // ヘッダーの後ろに要素が隠れないようにするため
      minHeight: "81vh", //コンテナ要素が少ない時にfooterを画面下部に表示する用(100vhでビューポート100%)
      backgroundColor: "#eece9a15",
      textAlign: "center",
    },
    "table": {
      width: "80%",
      margin: "3px auto",
      paddingTop: "10px",
      borderBottom: "solid 5px #c4872d",
    },
    "title": {
      fontSize: "15px",
      fontWeight: 700,
      background: "#c4872d",
      color: "#fff",
    },
    "items": {
      backgroundColor: "#eece9a",
      fontSize: "15px",
      fontWeight: 700,
    }
  })
)