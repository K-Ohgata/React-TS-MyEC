import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { shallow, mount } from 'enzyme';
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Home } from '../components/Home'
import { Detail } from '../components/Detail'
import { Cart } from '../components/Cart'
import { Check } from '../components/Check'
import { Done } from '../components/Done'
import { History } from '../components/History'


test('renders learn react link', () => {
  // enzymeから読み込んだshallowを使う例
  const wrapper = shallow(<App />);

  /** 各コンポーネントの数を取得し、1であればOK */
  expect(wrapper.find(Header).length).toBe(1);
  expect(wrapper.find(Footer).length).toBe(1);
  expect(wrapper.find(Home).length).toBe(1);
  expect(wrapper.find(Detail).length).toBe(1);
  expect(wrapper.find(Cart).length).toBe(1);
  expect(wrapper.find(Check).length).toBe(1);
  expect(wrapper.find(Done).length).toBe(1);
  expect(wrapper.find(History).length).toBe(1);
});
