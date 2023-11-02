<script lang="ts" type="module">
    import placeholder from "$lib/images/50x50.svg";
    import read from "$lib/images/read.svg";
</script>

<svelte:head>
    <title>Сообщения</title>
    <meta name="description" content="Messanger" />
</svelte:head>

<section>
    <h1>Чаты</h1>
    <hr />
    <a href=""><div class="chat">
        
            <div class="left">
                <img src={placeholder} alt="" />
                <div class="info">
                    <span>Номер группы</span>
                    <span>Последнее введенное сообщение</span>
                </div>
            </div>
            <div class="right">
                <span>22:55</span>
                <img src={read} alt="">
            </div>
    </div></a>
</section>

<style>
    section {
        max-width: 800px;
        width: 100%;
        margin: 10px auto;
        background-color: var(--sidebar-color);
        height: 100vh;
        border-radius: 20px;
    }
    h1 {
        text-align: left;
        font-size: 26px;
        font-weight: 700;
        margin: 20px 40px;
    }
    a {
        text-decoration: none;
    }
    .chat {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        margin: 20px 40px;
        height: 80px;
        background-color: var(--primary-color-light);
        border-radius: 15px;
        transition: linear 0.2s;
    }
    .chat:hover {
        background-color: var(--primary-head);
    }
    .left, .right {
        display: flex;
        text-align: left;
    }
    .left img {
        width: 50px;
        height: 50px;
        margin: 15px;
        border-radius: 50%;
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 5px 0;
    }
    .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin: 10px 20px;
    }
    .right img {
        height: 10px;
        width: 10px;
    }

</style>
