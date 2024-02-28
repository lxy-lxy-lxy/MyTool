import Home from "./components/Home.svelte";
import NotFound from "./components/NotFound.svelte";
import VList from "./src/Data/VirtualList/VirtualList.svelte";
import Raf from "./src/Data/Raf/Raf.svelte";

export const routes = {
    "/": Home,
    "/tool/VList": VList,
    "/tool/Raf": Raf,
    "*": NotFound
};

export const sideMenus = [
    {
        path: "/tool/VList",
        name: "虚拟列表"
    },
    {
        path: "/tool/Raf",
        name: "数据分片"
    }
]