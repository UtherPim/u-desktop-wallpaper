import React, { useEffect } from 'react';
import styled from './app.module.scss';
import TopFrame from './Layout/TopFrame'
import LeftMenu from './Layout/LeftMenu'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import KeepAlive, { AliveScope } from 'react-activation';
import { routes } from '_renderer/router'
import type { IRoute } from '_renderer/router'
import PureColor from './pages/Pure';

const App: React.FC = () => {
  useEffect(() => {
    window.ipcAPI?.rendererReady();
  }, []);

  return (
    <Router>
      <div className={styled.appContainer}>
        <TopFrame />
        <div className={styled.contentBox}>
          <LeftMenu />
          <div className={styled.rightContent}>
            <AliveScope>
              <Switch>
                {
                  routes.map((route: IRoute) => (
                    <Route key={route.path} path={route.path} render={(props: any) => {
                      return (
                      <KeepAlive style={{ height: '100%' }} when={route?.keepAlive ? true : false} id={route.path} name={route.path}>
                        <route.component></route.component>
                      </KeepAlive>
                      )
                    }}></Route>   
                  ))
                }
                <Route path="/" component={PureColor}></Route>
              </Switch>  
            </AliveScope>
            
          </div>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
