import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { ConfigProvider } from 'antd'

const themeConfig ={
  "components": {
    "Tabs": {
      "inkBarColor": "rgb(255,255,255)"
    }
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ConfigProvider theme={themeConfig}>
      <App />
    </ConfigProvider>
    </Provider>
  </StrictMode>,
)
