<script>
    import VList from "./components/VList.svelte";
    import {getContent} from "./components/utils.js";

    const dataLength = 100000;
    const data = Array(dataLength).fill(1).map((item, idx) => ({
        id: item + idx,
        value: getContent()
    }));

    const userVisibleHeight = (document.documentElement.clientHeight || 931) - 16;
    const estimateRowHeight = 81;
    const bufferSize = 8;

    function rowRender(index) {
        return data[index]
    }
</script>

<VList height={userVisibleHeight}
       total={dataLength}
       estimateRowHeight={estimateRowHeight}
       bufferSize={bufferSize}
       rowRenderer={rowRender}
/>