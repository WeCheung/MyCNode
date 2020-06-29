import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Home = ()=>import(/*webpackChunkName:"router"*/'views/home/Home')
const Articles = ()=>import(/*webpackChunkName:"router"*/'views/articles/Articles')
const SideInfo = ()=>import(/*webpackChunkName: "router"*/'views/side_info/SideInfo')
const User = ()=>import(/*webpackChunkName: "router"*/'views/user/User')

const routes = [
    {
        path: '/'
        , name: 'Home'
        , components: {
            main: Home
        }
    }
    , {
        path:'/topic/:id'
        , name: 'Article'
        , components: {
            main: Articles,
            side: SideInfo
        }
    }
    , {
        path: '/user/:username'
        , name: 'User'
        , components:{
            main: User
        }
    }
    , {
        path: '/user/:username'
        , redirect: '/user:username'
    }
    , {
        path: '*'
        , redirect: '/'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
