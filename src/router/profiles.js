import ShowProfile from "@/views/profiles/ShowProfile"

const routes = [
    {
        path: '/profile/:id',
        name: 'Profile.show',
        component: ShowProfile
    }
]

export default routes