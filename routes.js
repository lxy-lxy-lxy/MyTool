import Home from "./components/Home.svelte";
import NotFound from "./components/NotFound.svelte";
import VList from "./src/Data/VirtualList/VirtualList.svelte";
import Raf from "./src/Data/Raf/Raf.svelte";
import Keyword from "./src/Scene/Keyword/index.svelte";

export const routes = {
    "/": Home,
    // 技巧
    "/tool/VList": VList,
    "/tool/Raf": Raf,
    // 场景
    "/scene/Keyword": Keyword,
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
    },
    {
        path: "/scene/Keyword",
        name: "关键词屏蔽"
    }
]