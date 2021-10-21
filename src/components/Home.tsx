import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/styles';

const coffeeSelector = (state: any) => state.store.coffee

type Coffee = {
  id: number,
  name: string,
  detail: string,
  lsizePrice: number,
  msizePrice: number,
  pic: string
}[]

export const Home: React.FC = () => {
  const classes = useStyle()

  const history = useHistory()
  let fetchCoffee: Coffee = useSelector(coffeeSelector)
  const handleLink = (path: any) => history.push(path)

  const [keyword, setKeyword] = useState<string>('')
  const [fetchcoffee, setFetchCoffee] = useState<Coffee>([])
  const [coffee, setCoffee] = useState<Coffee>([])

  useEffect(() => {
    setFetchCoffee(fetchCoffee)
  })

  const searchCoffee = () => {
    let search: Coffee = [];
    fetchcoffee.forEach((item) => {
      if (item.name.indexOf(keyword) > -1) {
        search.push(item)
      }
    })
    if(keyword===''){
      alert('キーワードを入力してください')
    }else if (search.length === 0) {
      alert('該当する商品はありません')
      setCoffee(fetchcoffee)
      setKeyword('')
    } else {
      setCoffee(search)
    }
  }

  const clear = () => {
    setKeyword('')
    setCoffee(fetchcoffee)
  }

  const highSort = () => {
    if(coffee.length===0){
      const sortFetchCoffee = fetchcoffee.slice()
      sortFetchCoffee.sort((a, b) => {
        return b.msizePrice - a.msizePrice
      })
      setCoffee(sortFetchCoffee)
    } else{
      const sortFetchCoffee = coffee.slice()
      sortFetchCoffee.sort((a, b) => {
        return b.msizePrice - a.msizePrice
      })
      setCoffee(sortFetchCoffee)  
    }
  }

  const lowSort = () => {
    if(coffee.length===0){
      const sortFetchCoffee = fetchcoffee.slice()
      sortFetchCoffee.sort((a, b) => {
        return a.msizePrice - b.msizePrice
      })
      setCoffee(sortFetchCoffee)
    } else{
      const sortFetchCoffee = coffee.slice()
      sortFetchCoffee.sort((a, b) => {
        return a.msizePrice - b.msizePrice
      })
      setCoffee(sortFetchCoffee)  
    }
  }

  const displayCoffee = () => {
    return (
      <React.Fragment>
        <div className={classes.list}>
          {fetchcoffee.length === 0 && <div>loading...</div>}
          {coffee.length === 0 && fetchcoffee.map((item) => {
            return (
              <div className={classes.card}>
                <img src={item.pic} alt='coffee' onClick={() => handleLink(`detail/${item.id}`)} className={classes.pic} />
                <div onClick={() => handleLink(`detail/${item.id}`)} className={classes.name}>{item.name}</div>
                <div className={classes.cardContent}>
                  <div>Mサイズ:{item.msizePrice} 円</div>
                  <div>Lサイズ:{item.lsizePrice} 円</div>
                </div>
                <button onClick={() => handleLink(`detail/${item.id}`)} className={classes.button}>商品詳細へ</button>
              </div>
            )
          })}
          {coffee.length !== 0 && coffee.map((item) => {
            return (
              <div className={classes.card}>
                <img src={item.pic} alt='coffee' onClick={() => handleLink(`detail/${item.id}`)} className={classes.pic} />
                <div onClick={() => handleLink(`detail/${item.id}`)} className={classes.name}>{item.name}</div>
                <div className={classes.cardContent}>
                  <div>Mサイズ:{item.msizePrice} 円</div>
                  <div>Lサイズ:{item.lsizePrice} 円</div>
                </div>
                <button onClick={() => handleLink(`detail/${item.id}`)} className={classes.button}>商品詳細へ</button>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }

  return (
    <div className={classes.body}>
      <h1><u className={classes.underline}>商品検索</u></h1>
      <div>
        <input type='text' placeholder='商品を検索' value={keyword} onChange={(e) => { setKeyword(e.target.value) }} className={classes.text} autoComplete="on" list="data" />
        <datalist id="data">
          <option value="Gorgeous4サンド" />
          <option value="エスプレッソフラペチーノ" />
          <option value="Specialキャラメルドーナッツ" />
          <option value="チョコクッキー" />
          <option value="カフェモカ" />
          <option value="カフェラテ" />
          <option value="カプチーノ" />
          <option value="キャラメルマキアート" />
          <option value="キャラメルフラペチーノ" />
          <option value="バニラ クリーム フラペチーノ" />
          <option value="ダークモカフラペチーノ" />
          <option value="抹茶クリームフラペチーノ" />
          <option value="ドリップコーヒー" />
          <option value="アイスコーヒー" />
          <option value="アメリカン" />
          <option value="エスプレッソ" />
          <option value="ナッティホワイトモカ" />
          <option value="ジンジャーブレッドラテ" />
        </datalist>
        <button onClick={() => { searchCoffee() }} className={classes.button}>検索</button>
        <button onClick={() => { clear() }} className={classes.button}>クリア</button>
        <div className={classes.sort}>
        <button onClick={() => { highSort() }} className={classes.button}>高い順</button>
        <button onClick={() => { lowSort() }} className={classes.button}>低い順</button>
        </div>
      </div>
      {displayCoffee()}
    </div>
  )
}

const useStyle = makeStyles(() =>
  createStyles({
    "body": {
      textAlign: "center",
      paddingTop: "100px", // ヘッダーの後ろに要素が隠れないようにするため
      minHeight: "81vh", //コンテナ要素が少ない時にfooterを画面下部に表示する用(100vhでビューポート100%)
      backgroundColor: "#eece9a15",
    },
    "sort":{
      marginTop: "10px",
    },
    "card": {
      width: "350px",
      background: "#FFF",
      borderRadius: "10px",
      boxShadow: "5px 5px 5px #ccc",
      marginBottom: "40px",
    },
    "pic": {
      width: "350px",
      height: "350px",
      cursor: "pointer"
    },
    "name": {
      fontSize: "20px",
      fontWeight: 700,
      marginTop: "10px",
      textAlign: "center"
    },
    "cardContent": {
      padding: "5px",
      textAlign: "center",
      fontWeight: 700,
      marginBottom: "5px",
    },
    "button": {
      borderColor: "#c4872d",
      color: "#c4872d",
      fontWeight: 600,
      marginRight: "2px",
      marginBottom: "8px",
      backgroundColor: "#fff",
      padding: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#c4872d",
        color: "#fff"
      }
    },
    "text": {
      width: "250px",
      height: "38px",
      marginRight: "15px"
    },
    "list": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      height: "auto",
      width: "auto",
      padding: "5%",
    },
    "underline": {
      textDecoration: "none",
      borderBottom: "double 5px #c4872d",
    }

  })
)