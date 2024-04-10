<script>
    import {onMount} from "svelte";

    let keywordArr = ['渣渣', '渣滓', "垃圾", '菜鸡', '敏感词', '太拉垮了', '头盖骨', '鸡你太美', 'fuck you']

    const dirtyRoot = new Map()
    const buildMap = function (text) {
        let dirtyMap = dirtyRoot
        let origin = true
        if (!text) { // 敏感词不能为空
            return
        }
        for (let a = 0; a < text.length; a++) {
            if (origin && dirtyMap.get(text[a])) {
                // 当前字符已存在
                if (dirtyMap.get(text[a]) === true) {
                    // 已经存在更短的敏感词
                    return;
                }
                let oldDirtyMap = dirtyMap
                dirtyMap = dirtyMap.get(text[a])
                // 当前字符是最后一个字, 将dirtyMap置为true
                if (a === text.length - 1) {
                    oldDirtyMap.set(text[a], true)
                    // oldDirtyMap.
                }
            } else {
                origin = false
                if (a === text.length - 1) {
                    // 最后一个字
                    dirtyMap.set(text[a], true)
                } else {
                    // console.log(text[a])
                    dirtyMap.set(text[a], new Map())
                    dirtyMap = dirtyMap.get(text[a])
                }
            }
        }
    }

    function handleRoot() {
        for (let b = 0; b < keywordArr.length; b++) {
            buildMap(keywordArr[b])
        }
    }

    const dirtyCheckDFA = function (word, lastIndex) {
        if (!word || !dirtyRoot) {
            return {dirty: false}
        }
        let dirty = false
        let dirtyMap = dirtyRoot
        let start = null
        let end = 0
        let origin = true
        for (let i = 0; i < word.length; i++) {
            const aMap = dirtyMap.get(word[i])
            if (aMap) {
                // 在敏感词中匹配到该字符，且该字符为最后一个字
                if (aMap === true) {
                    // 敏感词长度为1
                    if (start === null) {
                        start = i
                    }
                    end = i
                    dirty = true
                    break
                } else {
                    // 在敏感词中匹配到该字符，但不是结尾
                    if (origin) {
                        start = i
                    }
                    dirtyMap = aMap
                    origin = false
                    if (i === word.length - 1) {
                        i = start
                        origin = true
                        dirtyMap = dirtyRoot
                    }
                }

            } else {
                if (!origin) {
                    // 在树结构中途退出，重新从进入字符的下一个字符检查
                    i = start
                }
                origin = true
                start = null
                dirtyMap = dirtyRoot
            }
        }
        if (dirty) {
            return {
                [start + lastIndex]: {dirty: true, start: start + lastIndex, end: end + lastIndex},
                ...dirtyCheckDFA(word.slice(end + 1), end + lastIndex + 1)
            }
        }
        return {}
    }

    function submit() {
        const text = document.querySelector('#text').value
        const textLength = text.length
        const checkResult = JSON.stringify(dirtyCheckDFA(text, 0))

        document.querySelector('.output').innerHTML = `输入字符串长度:${textLength}<br>dirtyCheckDFA运行结果:${checkResult}`
    }

    function updateKeyword(e) {
        keywordArr = e.target.value.trim().replaceAll("，", ",").split(",")
        handleRoot()
    }

    onMount(() => {
        handleRoot()
        document.getElementById("keyword").value = keywordArr.join(",")
    })
</script>

<form class="pure-form pure-form-stacked">
    <div class="pure-g">
        <div class="pure-u-1">
            <label for="keyword">关键词库</label>
            <textarea id="keyword" class="pure-u-1" on:blur={updateKeyword}></textarea>
        </div>
        <div class="pure-u-1">
            <label for="text">内容</label>
            <textarea id="text" class="pure-u-1"></textarea>
        </div>
    </div>
    <div>
        <button on:click={submit}>提交</button>
    </div>
</form>

<div class="output"></div>