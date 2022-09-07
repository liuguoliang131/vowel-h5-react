// Suspense用于组件切换时的空白期的显示
import React, { Suspense, lazy } from 'react'
import { Navigate, BrowserRouter, useRoutes } from 'react-router-dom'
import Home from '../pages/home/index.jsx'
import Preheat from '../pages/home/preheat.jsx'
import Login from '../pages/login/index.jsx'
import Layout from '../components/layout/index.jsx'
const MyEvent = lazy(() => import('../pages/myEvent/index.jsx'))
const MyPrize = lazy(() => import('../pages/myPrize/index.jsx'))
const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/layout',
    element: <Layout />,
    children: [
      {
        path: '/layout/home',
        element: <Home />
      },
      {
        path: '/layout/preheat',
        element: <Preheat />
      },
      {
        path: '/layout/myEvent',
        element: <MyEvent />
      },
      {
        path: '/layout/myPrize',
        element: <MyPrize />
      },
      {
        path: '/layout',
        element: <Navigate to={'/layout/home'} />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to={'/login'} />
  }
]
const GetRoutes = () => {
  return useRoutes(routes)
}
const SetRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="webLoading">加载中...</div>}>
        <GetRoutes></GetRoutes>
      </Suspense>
    </BrowserRouter>
  )
}

export default SetRoutes
