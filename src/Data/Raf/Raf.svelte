<svelte:options immutable/>

<script>
    import {onMount} from "svelte";
    import ImmutableTodo from './component/ImmutableTodo.svelte';

    let todos = [];

    function toggle(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                // return a new object
                return {
                    id,
                    done: !todo.done,
                    text: todo.text
                };
            }

            // return the same object
            return todo;
        });
    }

    onMount(() =>{
        const total = 100000
        // 一次插入 20 条，如果觉得性能不好就减少
        const once = 20
        // 渲染数据总共需要几次
        const loopCount = total / once
        let countOfRender = 0
        function add() {
            const arr = []
            for (let i = 0; i < once; i++) {
                const li = document.createElement("li");
                li.innerText = Math.floor(Math.random() * total);
                arr.push({
                    id: countOfRender * once + i +1,
                    done: false,
                    text: Math.floor(Math.random() * total)
                })
            }
            todos = todos.concat(arr)
            countOfRender += 1;
            loop();
        }
        function loop() {
            if (countOfRender < loopCount) { // 递归终止条件
                window.requestAnimationFrame(add);
            }
        }
        loop();
    })
</script>

<h2>数据分片（十万）</h2>
{#each todos as todo}
    <ImmutableTodo {todo} on:click="{() => toggle(todo.id)}"/>
{/each}