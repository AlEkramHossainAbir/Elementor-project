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
    },
    "Switch":{
      "colorPrimary": "rgb(243,186,253)",
      "colorPrimaryHover": "rgb(243,186,253)",
      "colorPrimaryBorder": "rgb(243,186,253)",
      "colorTextQuaternary": "rgb(213,216,220)",
      "colorTextTertiary": "rgb(213,216,220)"
    },
    "Button": {
      "colorPrimary": "rgb(235,142,251)",
      "colorPrimaryHover": "rgb(234,116,255)",
      "colorTextLightSolid": "rgb(0,0,0)",
      "borderRadius": 1,
      "contentFontSize": 13
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
