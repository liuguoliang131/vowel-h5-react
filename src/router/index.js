// Suspense用于组件切换时的空白期的显示
import React, { Suspense, lazy } from 'react'
import { Navigate, HashRouter, useRoutes, Routes, Route } from 'react-router-dom'
import utils from '../utils'
import Home from '../pages/home/index.jsx'
import Preheat from '../pages/home/preheat.jsx'
import Login from '../pages/login/index.jsx'
import Layout from '../components/layout/index.jsx'
const MyEvent = lazy(() => import('../pages/myEvent/index.jsx'))
const MyPrize = lazy(() => import('../pages/myPrize/index.jsx'))
const MyCourse = lazy(() => import('../pages/myCourse/index.jsx'))
const Test = lazy(() => import('../pages/test/index.jsx'))
const Poster = lazy(() => import('../pages/poster/index.jsx'))
const routes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      auth: false
    }
  },
  {
    path: '/layout',
    element: <Layout />,
    meta: {
      auth: false
    },
    children: [
      {
        path: '/layout/home',
        element: <Home />,
        meta: {
          auth: true
        }
      },
      {
        path: '/layout/preheat',
        element: <Preheat />,
        meta: {
          auth: true
        }
      },
      {
        path: '/layout/myEvent',
        element: <MyEvent />,
        meta: {
          auth: true
        }
      },
      {
        path: '/layout/myPrize',
        element: <MyPrize />,
        meta: {
          auth: true
        }
      },
      {
        path: '/layout/myCourse',
        element: <MyCourse />,
        meta: {
          auth: true
        }
      },
      {
        path: '/layout/test',
        element: <Test />,
        meta: {
          auth: true
        }
      },
      {
        path: '/layout/poster',
        element: <Poster />,
        meta: {
          auth: true
        }
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
const white = ['/layout/home', '/login']
const GetRoutes = () => {
  const params = utils.getHashQuery()
  console.log('route', params)
  const children = useRoutes(routes)
  const is = utils.isApp()
  if (!white.includes(params.path)) {
    if (!utils.getToken()) {
      if (is) {
        utils.goLogin()
        window.history.go(-1)
      } else {
        return (<Navigate to={`/login?${Object.keys(params.query)}&back=${params.path}`} replace />)
      }
    }
  }

  return children
}
const SetRoutes = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div className="webLoading">加载中...</div>}>
        <GetRoutes></GetRoutes>
        {/* <Routes>
          <Route path={'/layout'} element={<Layout></Layout>}>
            <Route path={'/layout/home'} element={<Home></Home>}></Route>
          </Route>
          <Route path={'/login'} element={<Login></Login>}></Route>
        </Routes> */}
      </Suspense>
    </HashRouter>
  )
}

export default SetRoutes
