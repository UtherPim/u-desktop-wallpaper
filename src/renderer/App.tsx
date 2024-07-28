import React, { useEffect } from 'react';
import style from './app.module.scss';

function App(): JSX.Element {
  useEffect(() => {
    window.ipcAPI?.rendererReady();
  }, []);

  return (
    <div className={style.appContainer}>
      <div className={style.leftMenu}>
        Welcome to React, Electron and TypeScript
      </div>
      <div className={style.rightContent}>Hello</div>
    </div>
  );
}

export default App;
