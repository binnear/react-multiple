import React from 'react';
import s from './index.pcss';
// import '../../public/js/mock/mock';
import { Button } from 'antd-mobile';
import { Provider } from 'react-redux';
import store from '../../stores/index'
import Demo from './components/Demo'


class Index extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className={s.index} >
          <Demo />
        </div>
      </Provider>
    )
  }
}

export default Index