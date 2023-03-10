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
const IntroductionMp = lazy(() => import('../pages/introductionMp/index.jsx'))
const routes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      auth: false,
      title: '登录'
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
          auth: true,
          title: '音乐无限 好礼相伴'
        }
      },
      {
        path: '/layout/preheat',
        element: <Preheat />,
        meta: {
          auth: true,
          title: '幸运大转盘'
        }
      },
      {
        path: '/layout/myEvent',
        element: <MyEvent />,
        meta: {
          auth: true,
          title: '我的活动'
        }
      },
      {
        path: '/layout/myPrize',
        element: <MyPrize />,
        meta: {
          auth: true,
          title: '我的奖品'
        }
      },
      {
        path: '/layout/myCourse',
        element: <MyCourse />,
        meta: {
          auth: true,
          title: '我的课程'
        }
      },
      {
        path: '/layout/test',
        element: <Test />,
        meta: {
          auth: true,
          title: 'test'
        }
      },
      {
        path: '/layout/poster',
        element: <Poster />,
        meta: {
          auth: true,
          title: '活动海报'
        }
      },
      {
        path: '/layout',
        element: <Navigate to={'/layout/home'} />
      }
    ]
  },
  // 公众号介绍
  {
    path: '/introductionMp',
    element: <IntroductionMp />,
    meta: {
      auth: true,
      title: '必读 | 新用户使用指南'
    }
  },
  {
    path: '*',
    element: <Navigate to={'/login'} />
  }
]
// 查找是否有此路由
function deepSearch (list, path) {
  let flag = false
  list.forEach(item => {
    if (item.path === path) {
      flag = true
    } else {
      if (item.children && item.children instanceof Array) {
        flag = deepSearch(item.children, path)
      }
    }
  })
  return flag
}
// search并且return路由
function deepGetRoute (list, path) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.path === path) {
      return item
    } else {
      if (item.children && item.children instanceof Array) {
        return deepGetRoute(item.children, path)
      }
    }
  }
}
const inApp = utils.isApp()
const white = inApp ? ['/layout/home', '/IntroductionMp'] : ['/layout/home', '/login', '/IntroductionMp']
const GetRoutes = () => {
  const params = utils.getHashQuery()
  // console.log('route', params)
  const theRoute = deepGetRoute(routes, params.path)
  // console.log('theRoute', theRoute)
  if (theRoute) {
    document.title = theRoute.meta.title || '幸运大转盘'
  }

  const children = useRoutes(routes)
  if (!white.map(item => item.toLowerCase()).includes(params.path.toLowerCase())) {
    if (!utils.getToken()) {
      if (inApp) {
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
