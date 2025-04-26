import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '@/views/Main.vue'
import Trips from '@/views/Trips.vue'
import Navbar from '@/components/Navbar.vue'
import Explore from '@/views/Explore.vue'
import SignIn from '@/views/SignIn.vue'
import Profile from '@/views/Profile.vue'
import Join from '@/views/Join.vue'
import Excursions from '@/views/Excursions.vue'
import Friends from '@/views/Friends.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        mainCont: Home
      },
    },
    {
      path: '/main',
      name: 'main',
      components: {
        navbar: Navbar,
        mainCont: Main
      }
    },
    {
      path: '/trips',
      name: 'trips',
      components: {
        navbar: Navbar,
        mainCont: Trips
      }
    },
    {
      path: '/explore',
      name: 'explore',
      components: {
        navbar: Navbar,
        mainCont: Explore
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        navbar: Navbar,
        mainCont: Profile
      }

    },
    {
      path: '/excursions',
      name: 'excursions',
      components: {
        navbar: Navbar,
        mainCont: Excursions
      }

    },
    {
      path: '/friends',
      name: 'friends',
      components: {
        navbar: Navbar,
        mainCont: Friends
      }

    },
    {
      path: '/signin',
      name: 'signin',
      components: {
        mainCont: SignIn
      }
    },
    {
      path: '/join',
      name: 'join',
      components: {
        mainCont: Join
      }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
