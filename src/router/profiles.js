import ShowProfile from "@/views/profiles/ShowProfile"
import SettingProfile from "@/views/profiles/SettingProfile"

const routes = [
    {
        path: '/profile/:id',
        name: 'Profile.show',
        component: ShowProfile
    },
    {
        path: '/me/setting',
        name: 'Profile.setting',
        component: SettingProfile
    },
]

export default routes