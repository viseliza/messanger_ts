<script lang="ts" type="module">
    import placeholder from "$lib/images/50x50.svg";
    import read from "$lib/images/read.svg";
</script>

<svelte:head>
    <title>Сообщения</title>
    <meta name="description" content="Messanger" />
</svelte:head>

<section>
    <div class="title_messanger">
        <span class="title">Чаты</span>
    </div>
    <div class="chats">
        <a href="messanger/chat"><div class="chat">
            <div class="left">
                <img src={placeholder} alt="" />
                <div class="info">
                    <span>Номер группы</span>
                    <span>Последнее введенное сообщение</span>
                </div>
            </div>
            <div class="right">
                <span>22:55</span>
                <img src={read} alt="" />
            </div>
        </div></a>
    </div>
    <!-- ./chats -->
</section>

<style>
    section {
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        background-color: var(--sidebar-color);
        height: 100%;
        min-height: 95vh;
        border-radius: 20px;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    .title_messanger {
        border-radius: 15px 15px 0 0;
        height: 6vh;
        display: flex;
        align-items: center;
        background-color: var(--primary-head);
    }
    .title {
        font-size: 24px;
        font-weight: 700;
        padding-left: 3vw;
        text-align: left;
    }
    a {
        text-decoration: none;
    }
    .chats {
        margin: 30px 10px;
    }
    .chat {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        margin: 10px 20px;
        height: 80px;
        background-color: var(--primary-color-light);
        border-radius: 15px;
        transition: linear 0.2s;
    }
    .chat:hover {
        background-color: var(--primary-head);
    }
    .left,
    .right {
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
