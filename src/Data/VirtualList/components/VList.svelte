<script>
    import {binarySearch, CompareResult} from "./utils.js";
    import {onMount, afterUpdate} from "svelte";

    let scrollingEle
    let phantomEle
    let actualEle
    let scrollTop

    export let height
    export let total
    export let estimateRowHeight
    export let bufferSize = 5
    export let rowRenderer

    const obj = {
        height,
        total,
        estimateRowHeight,
        // 列表总高度
        phantomHeight: estimateRowHeight * total
    }

    // 可视范围内展示元素数
    let limit = Math.ceil(obj.height / obj.estimateRowHeight);
    // 记录当前的真实开始下标
    let originStartIdx = 0;
    // 数据（含缓冲数据）的头部下标
    let startIndex = 0;
    // 数据（含缓冲数据）的尾部下标
    let endIndex = Math.min(
        originStartIdx + limit + bufferSize,
        obj.total -= 1
    );

    // handle dynamic inner content height
    let cachedPositions = [];

    onMount(() => {
        if (actualEle && obj.total > 0) {
            updateCachedPositions();
        }
    })

    afterUpdate(() => {
        updateList()
    })

    function updateList() {
        if (obj.total !== total) {
            obj.total = total;
            resetAllVirtualParam();
            return;
        }

        if (actualEle && obj.total > 0) {
            updateCachedPositions();
        }
    }

    function initCachedPositions() {
        const {total, estimateRowHeight} = obj;
        cachedPositions = [];
        for (let i = 0; i < total; ++i) {
            cachedPositions[i] = {
                index: i,
                height: estimateRowHeight,
                top: i * estimateRowHeight,
                bottom: (i + 1) * estimateRowHeight,
                dValue: 0
            };
        }
    }

    /**
     * Update cached positions when componentDidMount Triggered...
     */
    function updateCachedPositions() {
        // update cached item height
        const nodes = actualEle.childNodes;
        const start = nodes[0];

        // calculate height diff for each visible node...
        nodes.forEach((node) => {
            if (!node) {
                // scroll too fast?...
                return;
            }
            const rect = node.getBoundingClientRect();
            const {height} = rect;
            const index = Number(node.id.split("-")[1]);
            const oldHeight = cachedPositions[index].height;
            const dValue = oldHeight - height;

            if (dValue) {
                cachedPositions[index].bottom -= dValue;
                cachedPositions[index].height = height;
                cachedPositions[index].dValue = dValue;
            }
        });

        // perform one time height update...
        let startIdx = 0;
        if (start) {
            startIdx = Number(start.id.split("-")[1]);
        }
        const cachedPositionsLen = cachedPositions.length;
        let cumulativeDiffHeight = cachedPositions[startIdx].dValue;
        cachedPositions[startIdx].dValue = 0;

        for (let i = startIdx + 1; i < cachedPositionsLen; ++i) {
            const item = cachedPositions[i];
            // update height
            cachedPositions[i].top = cachedPositions[i - 1].bottom;
            cachedPositions[i].bottom =
                cachedPositions[i].bottom - cumulativeDiffHeight;

            if (item.dValue !== 0) {
                cumulativeDiffHeight += item.dValue;
                item.dValue = 0;
            }
        }

        // update our phantom div height
        obj.phantomHeight = cachedPositions[cachedPositionsLen - 1].bottom;
    }

    function getStartIndex(sTop = 0) {
        let idx = binarySearch(
            cachedPositions,
            sTop,
            (currentValue, targetValue) => {
                const currentCompareValue = currentValue.bottom;
                if (currentCompareValue === targetValue) {
                    return CompareResult.eq;
                }

                if (currentCompareValue < targetValue) {
                    return CompareResult.lt;
                }

                return CompareResult.gt;
            }
        );

        const targetItem = cachedPositions[idx];

        // In case of binarySearch give us a not visible data(an idx of current visible - 1)...
        if (targetItem.bottom < sTop) {
            idx += 1;
        }

        return idx;
    }

    /**
     * Rest all VList helper param when total changes
     */
    function resetAllVirtualParam() {
        originStartIdx = 0;
        startIndex = 0;
        endIndex = Math.min(
            originStartIdx + limit + bufferSize,
            obj.total - 1
        );
        scrollingEle.scrollTop = 0;
        initCachedPositions();

        // rest phantom div height
        obj.phantomHeight = obj.estimateRowHeight * obj.total;
        scrollTop = 0
    }

    function onScroll(evt) {
        if (evt.target === scrollingEle) {
            const sEle = evt.target;

            const currentStartIndex = getStartIndex(sEle.scrollTop);

            if (currentStartIndex !== originStartIdx) {
                // we need to update visualized data
                originStartIdx = currentStartIndex;
                startIndex = Math.max(originStartIdx - bufferSize, 0);
                endIndex = Math.min(
                    originStartIdx + limit + bufferSize,
                    total - 1
                );
                scrollTop = sEle.scrollTop
            }
        }
    }

    initCachedPositions()
</script>

<div bind:this={scrollingEle}
     on:scroll={onScroll}
     class="box"
     style={`height: ${obj.height}px`}
>
    <div bind:this={phantomEle}
         class="phantom"
         style={`height: ${obj.phantomHeight}px`}
    ></div>
    <div class="actual"
         style={`transform: translate3d(0,${startIndex >= 1? cachedPositions[startIndex].bottom: 0}px,0)`}
         bind:this={actualEle}
    >
        {#each Array(Math.max(endIndex - startIndex, 0)).fill(0).reduce((pre, next, idx) => {
            pre.push(rowRenderer(idx + startIndex + next))
            return pre
        }, []) as {id, value}}
            <div class="itemClass"
                 id={`item-${id}`}
            >
                <span class="idClass">
                    Id - {id} Content:
                </span>
                <span class="valClass">
                    {value}
                </span>
            </div>
        {/each}
    </div>
</div>

<style>
    .box {
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        max-width: 800px;
        margin: auto;
    }

    .phantom {
        position: relative;
    }

    .actual {
        width: 100%;
        position: absolute;
        top: 0;
    }

    .itemClass {
        padding: 20px;
        border-bottom: 1px solid #000;
        left: 0;
        right: 0;
    }

    .idClass {
        display: block;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 14px;
    }

    .valClass {
        width: 100%;
        color: rgba(0, 0, 0, 0.5);
        font-size: 16px;
    }
</style>