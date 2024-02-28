<script>
    import {createEventDispatcher} from 'svelte';
    import {debounce} from "../../utility/utils.js";

    const dispatch = createEventDispatcher();

    let pass = ""
    let promise

    async function login() {
        const success = pass === "111111"
        if (success) {
            let dateTime = new Date();
            dateTime = Date.parse(new Date(dateTime.setDate(dateTime.getDate() + 1)));
            localStorage.setItem("loginTime", dateTime)
            dispatch('message');
        }
        return success
    }

    function handleClick() {
        promise = debounce(login(), 500);
    }
</script>

<div class="pure-form login">
    <h3 class="text-center">請輸入訪問密碼</h3>
    <fieldset>
        <input bind:value={pass} type="text" class="" placeholder="Password"/>
    </fieldset>
    <button type="submit" class="summit pure-button pure-button-primary" on:click={handleClick}>
        提交
    </button>
    {#await promise}
        <p>...waiting</p>
    {:then res}
        <p style="color: red">{res === false ? "登録失敗！" : ""}</p>
    {:catch error}
        <p style="color: red">拒絶訪問！</p>
    {/await}
</div>

<style>
    .login {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #cccccc;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        padding: 1rem;
    }

    .summit {
        width: 100%
    }
</style>