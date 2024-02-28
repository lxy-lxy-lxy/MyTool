import Home from "./components/Home.svelte";
import NotFound from "./components/NotFound.svelte";
import VList from "./src/Data/VirtualList/VirtualList.svelte";

export const routes = {
    "/": Home,
    "/tool/VList": VList,
    "*": NotFound
};

export const sideMenus = [
    {
        path: "/tool/VList",
        name: "虚拟列表"
    }
]