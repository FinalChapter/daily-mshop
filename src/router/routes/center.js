import Center from "@/views/Center/Index"
import Login from "@/views/Center/Login"
import Register from "@/views/Center/Register"
var  centerRoutes = [
    {
        path:'/mshop/center',
        component:Center
    },
    {
        path:'/mshop/login',
        component:Login
    },
    {
        path:'/mshop/register',
        component:Register
    }
]
export default centerRoutes