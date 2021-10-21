import { SETLOGINUSER, setLoginUser } from '../actions/action'
import { DELETELOGINUSER, deleteLoginUser } from '../actions/action'
import { FETCHCARTITEM, fetchCartItem } from '../actions/action'
import { FETCHCOFFEE, fetchCoffee } from '../actions/action'
import { FETCHTOPPING, fetchTopping } from '../actions/action'
import { ADDITEM, addItem } from '../actions/action'
import { DELETEITEM, deleteItem } from '../actions/action'
import { RESETCART, resetCart } from '../actions/action'


//Action Creatorを正しく呼びだすことができること＆returnされたActionオブジェクトが期待するものであるかテスト
test('should create an action to setLoginUser', () => {
  const loginUser: any = { id: 2 }
  const expectedAction = {
    type: SETLOGINUSER,
    loginUser
  }
  expect(setLoginUser(loginUser)).toEqual(expectedAction)
})

test('should create an action to deleteLoginUser', () => {
  const expectedAction = {
    type: DELETELOGINUSER,
  }
  expect(deleteLoginUser()).toEqual(expectedAction)
})

test('should create an action to fetchCartItem', () => {
  const Cart: any = { id: 2 }
  const expectedAction = {
    type: FETCHCARTITEM,
    Cart
  }
  expect(fetchCartItem(Cart)).toEqual(expectedAction)
})

test('should create an action to fetchCoffee', () => {
  const Coffee: any = { id: 2 }
  const expectedAction = {
    type: FETCHCOFFEE,
    Coffee
  }
  expect(fetchCoffee(Coffee)).toEqual(expectedAction)
})

test('should create an action to fetchTopping', () => {
  const Topping: any = { id: 2 }
  const expectedAction = {
    type: FETCHTOPPING,
    Topping
  }
  expect(fetchTopping(Topping)).toEqual(expectedAction)
})

test('should create an action to addItem', () => {
  const cartItemList: any = { id: 2 }
  const expectedAction = {
    type: ADDITEM,
    cartItemList
  }
  expect(addItem(cartItemList)).toEqual(expectedAction)
})

test('should create an action to deleteItem', () => {
  const cartItemList: any = { id: 2 }
  const expectedAction = {
    type: DELETEITEM,
    cartItemList
  }
  expect(deleteItem(cartItemList)).toEqual(expectedAction)
})

test('should create an action to resetCart', () => {
  const expectedAction = {
    type: RESETCART,
  }
  expect(resetCart()).toEqual(expectedAction)
})