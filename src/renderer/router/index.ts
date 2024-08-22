import PureColor from "../pages/Pure"
import Bing from '../pages/Bing'
import WallHaven from '../pages/WallHaven'
import Dynamic from "../pages/Dynamic"

export type IRoute = {
    path: string,
    component: React.FC,
    routes?: IRoute[],
    keepAlive?: boolean
}

export const routes = [
    {
        path: '/pure',
        component: PureColor
    },
    {
        path: '/bing',
        component: Bing,
        keepAlive: true
    },
    {
        path: '/dynamic',
        component: Dynamic,
        keepAlive: true
    },
    {
        path: '/wallhaven',
        component: WallHaven,
        keepAlive: true
    }
]