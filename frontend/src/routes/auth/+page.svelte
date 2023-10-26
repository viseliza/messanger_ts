<svelte:head>
    <title>Авторизация</title>
    <meta name="description" content="About this app" />
</svelte:head>

<div class="wrap-login">
    <form class="form_login" action="">
        <span class="title">Авторизация</span>
        <span>Novsu логин</span>
        <input placeholder="Введите логин..." type="text" />
        <span>Novsu пароль</span>
        <input placeholder="Введите пароль..." type="password" />
        <button>Войти</button>
    </form>
</div>

<style>
    .wrap-login {
        width: 560px;
        background-color: #fff;
        padding: 60px;
        margin: auto;
        position: relative;
    }
    .form_login {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .title {
        font-size: 26px;
        margin-bottom: 10px;
        font-weight: 400;
    }
    span {
        padding-bottom: 20px;
        width: 100%;
    }
    input {
        display: block;
        width: 100%;
        height: 45px;
        padding: 0.375rem 0.75rem;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 400;
        padding: 0 20px 0 20px;
        line-height: 1.5;
        margin-bottom: 30px;
        color: #212529;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #bdbdbd;
        border-radius: 10px;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 150px;
        background-color: #333;
        color: aliceblue;
        height: 55px;
        border: none;
        border-radius: 20px;
        transition: all 0.4s;
    }
    .input::placeholder {
        color: #212529;
        opacity: 0.4;
    }
    button:hover {
        cursor: pointer;
        background-color: #1b1b1b;
    }
</style>
