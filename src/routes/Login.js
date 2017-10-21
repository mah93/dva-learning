import React from 'react';
import { connect } from 'dva';
import { Input, Icon, Button, Spin } from 'antd';
import styles from './Login.css';

function Login({ login, dispatch }) {
  const userName = (e) => {
    dispatch({
      type: 'login/save',
      payload: {
        user: e.target.value,
      },
    });
  };
  const password = (e) => {
    dispatch({
      type: 'login/save',
      payload: {
        password: e.target.value
      },
    });
  };
  const submit = () => {
    dispatch({
      type: 'login/fetch',
      payload: {
        userName: login.user,
        passWord: login.password,
      },
    });
  };
  return (
    <div className={styles.inputDiv}>
      <Spin spinning={login.loading}>
        <div>
          <Input
            placeholder="用户名"
            prefix={<Icon type="user" />}
            value={login.user}
            size="large"
            className={styles.inputUser}
            onChange={userName}
          />
        </div>
        <div>
          <Input
            placeholder="密码"
            prefix={<Icon type="lock" />}
            value={login.password}
            size="large"
            className={styles.inputPass}
            onChange={password}
          />
        </div>
        <Button type="primary" className={styles.button} onClick={submit}>
            登录
        </Button>
      </Spin>
    </div>
  );
}

Login.propTypes = {
};

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps)(Login);
