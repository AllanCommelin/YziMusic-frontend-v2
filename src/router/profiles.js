import ShowProfile from "@/views/profiles/ShowProfile"
import SettingProfile from "@/views/profiles/SettingProfile"
import SearchProfile from "@/views/profiles/SearchProfile";

const routes = [
    {
        path: '/profile/:id',
        name: 'Profile.show',
        component: ShowProfile
    },
    {
        path: '/me',
        name: 'Profile.me',
        component: ShowProfile
    },
    {
        path: '/search',
        name: 'Profile.search',
        component: SearchProfile
    },
    {
        path: '/me/setting',
        name: 'Profile.setting',
        component: SettingProfile
    },
]

export default routes