<script>
    import {onMount} from "svelte";

    const dirtyTextArr = ['日本人', '日本鬼子', '日本男人']
    console.log('敏感词个数 -> ', dirtyTextArr.length)
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
    for (let b = 0; b < dirtyTextArr.length; b++) {
        buildMap(dirtyTextArr[b])
    }

    console.log('整理为map结构 -> ', dirtyRoot)

    const dirtyCheckDFA = function (word){
        if (!word || !dirtyRoot) {
            return {dirty: false}
        }
        let dirty = false
        let dirtyMap = dirtyRoot
        let start = null
        let end = 0
        let origin = true
        for (let i = 0; i < word.length; i++) {
            // console.log(word[i])
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
                    // console.log(aMap)
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
            return { dirty: true, start, end}
        }
        return {dirty: false}
    }

    const dirtyCheckLoop  = function (word) {
        if (!word) {
            return {dirty: false}
        }
        for (let a = 0; a < dirtyTextArr.length; a++) {
            const startIndex = word.indexOf(dirtyTextArr[a])
            if (startIndex !== -1) {
                return {dirty: true, start: startIndex, end: startIndex + dirtyTextArr[a].length - 1}
            }
        }
        return {dirty: false}
    }

    function submit() {
        console.log('**********************')
        const text = document.querySelector('#text').value
        const textLength = text.length
        // console.log('待检测字符串长度',)

        console.time('dirtyCheckDFA')
        const checkResult = JSON.stringify(dirtyCheckDFA(text))
        console.timeEnd('dirtyCheckDFA')


        console.time('dirtyCheckLoop')
        const checkResult2 = JSON.stringify(dirtyCheckLoop(text))
        console.timeEnd('dirtyCheckLoop')
        document.querySelector('.output').innerHTML = `输入字符串长度:${textLength}<br>dirtyCheckDFA运行结果:${checkResult}<br>dirtyCheckLoop运行结果:${checkResult2}`
    }

    onMount(() => {
        document.getElementById("button")?.addEventListener('click', submit)
    })
</script>

<textarea id="text"></textarea>
<div>
    <button id="button">提交</button>
</div>

<div class="output"></div>