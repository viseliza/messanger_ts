<script lang="ts">
    import { io } from "socket.io-client";
    import { page } from "$app/stores";
    import placeholder from "$lib/images/50x50.svg";
    import attachment from "$lib/images/attachment.svg";
    import attachment_dark from "$lib/images/attachment_dark.svg";
    import play from "$lib/images/navigation.svg";
    import play_dark from "$lib/images/navigation_dark.svg";
    import points from "$lib/images/points.svg";
    import arrow_left from "$lib/images/arrow-left.png";
    import arrow_left_dark from "$lib/images/arrow-left_dark.png";
    import type { PageData } from "./$types";

    export let data: PageData;
    const socket = io("http://localhost:3000");

    let messages: Array<any>;
    let name = "";
    const room_id = data.room.id;
    // let name = `${$page.data.user.first_name} ${$page.data.user.last_name}`;
    let text = "";
    let group = data.room.name;
	let joined = true;

	socket.on('connect', () => {
		socket.emit('joinRoom', group);

        socket.emit("findAllMessages", room_id, (response: any) => {
            messages = response;
        });

        socket.on("message", (message) => {
            messages = [...messages, message]
        });
    });

    const sendMessage = () => {
        socket.emit("createMessage", { 
            name: name, 
            text: text,
            time: new Date().toLocaleTimeString().slice(0, -3), 
            room: group,
            room_id: room_id,
        }, () => {
                text = "";
            }
        );
    };

    const join = () => {
        socket.emit("join", { name: name }, () => {
            joined = true;
			socket.emit('joinRoom', group)
        });
    };
    
    let theme = $page.data.user.theme;
</script>


<svelte:head>
    <title>Чат</title>
    <meta name="description" content="Messanger" />
</svelte:head>

<section>
    <div class="chat_header">
        <div class="back">
            <a class="back" href="./" style="text-decoration: none;">
            {#if theme == 'white'}
            <img class="nav_icon" src={arrow_left} alt="">
            {:else}
            <img class="nav_icon" src={arrow_left_dark} alt="">
            {/if}
            <span>Назад</span>
            </a>
        </div>
        <div class="title_box">
            <span class="title">Название группы</span>
            <span class="count">n колличество участников</span>
        </div>
        <div class="info">
            <img src={points} alt="">
            <img id="icon" class="avatar" src={placeholder} alt="">
        </div>
    </div>
    <!-- ./chat_header -->
    <div class="chat_messages">
        {#if !joined}
            <div>
                <form>
                    <span>What's your name?</span>
                    <input bind:value={name} />
                    <input bind:value={group} />
                    <button type="submit" on:click={() => join()}>Send</button>
                </form>
            </div>
        {:else}
            {#if messages}
                {#each messages as message, index}
                    {#if message.name != "0"}
                        {#if index != 0 && messages[index - 1].time == messages[index].time}
                        <div class="message" style="padding-top: 0; margin-left: 55px;">
                            <div class="content">
                                <span class="text">{message.text}</span>
                                <span style="font-size: 12px; align-self: flex-end; margin-top: 2px;">{message.time}</span>
                            </div>
                        </div>
                        {:else}
                        <div class="message">
                            <div class="icon"><img class="avatar" src={placeholder} alt=""></div>
                            <div class="content">
                                <span class="text">{message.text}</span>
                                <span style="font-size: 12px; align-self: flex-end; margin-top: 2px;">{message.time}</span>
                            </div>
                        </div>
                        {/if}
                    {:else}
                    {#if index != 0 && messages[index - 1].time == messages[index].time}
                        <div class="message" style="padding-top: 0; margin-right: 55px; align-self: flex-end;">
                            <div class="content" style="background-color: var(--message-back);">
                                <span class="text">{message.text}</span>
                                <span style="font-size: 12px; align-self: flex-end; margin-top: 2px;">{message.time}</span>
                            </div>
                            <script>
                                element = document.getElementsByClassName('chat_messages')[0];
                                element.scrollTop = element.scrollHeight;
                            </script>
                        </div>
                        {:else}
                        <div class="message" style="align-self: flex-end;">
                            <div class="content" style="background-color: var(--message-back);">
                                <span class="text">{message.text}</span>
                                <span style="font-size: 12px; align-self: flex-end; margin-top: 2px;">{message.time}</span>
                            </div>
                            <div class="icon"><img class="avatar" src={placeholder} alt=""></div>
                            <script>
                                element = document.getElementsByClassName('chat_messages')[0];
                                element.scrollTop = element.scrollHeight;
                            </script>
                        </div>
                        {/if}
                    {/if}
                    
                    <script>
                        element = document.getElementsByClassName('chat_messages')[0];
                        if (element.scrollTop + 1000 > element.scrollHeight)
                            element.scrollTop = element.scrollHeight;
                    </script>
                {/each}
                <script>
                    element = document.getElementsByClassName('chat_messages')[0];
                    element.scrollTop = element.scrollHeight;
                </script>
            {:else}
                <span style="display: flex; justify-content: center; align-items: center; flex: 1 1 auto;">Кажется, здесь ничего нет...</span>
            {/if} 
        {/if}
    </div>
    <!-- ./chat_messages -->
    <div class="chat_footer">
        <button>
            {#if theme == 'white'}
            <img id="icon" class="nav_icon" src={attachment} alt="">
            {:else}
            <img id="icon" class="nav_icon" src={attachment_dark} alt="">
            {/if}
        </button>
        <input placeholder="Введите сообщение..." bind:value={text} type="text"/>
        <button type="submit" on:click={() => sendMessage()}>
            {#if theme == 'white'}
            <img id="icon" class="nav_icon" src={play} alt="">
            {:else}
            <img id="icon" class="nav_icon" src={play_dark} alt="">
            {/if}
        </button>
    </div>
    <!-- ./chat_footer -->
</section>


<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 65vh;
        width: 100%;
        margin: 10px auto;
        background-color: var(--sidebar-color);
        height: 100%;
        min-height: 95vh;
        border-radius: 20px;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    .chat_header {
        border-radius: 15px 15px 0 0;
        height: 6vh;
        background-color: var(--primary-head);
        display: flex;
        flex-direction: row;
    }
    .chat_messages {
        flex: 1 1 auto;
    }
    .chat_footer {
        height: 7vh;
        border-radius: 0 0 15px 15px;
        background-color: var(--primary-head);
        display: flex;
        flex-direction: row;
        padding: 0 10px;
    }
    input {
        margin: 10px;
        flex: 1 1 auto;
        background-color: transparent;
        border-radius: 5px;
        border: none;
        padding: 5px 15px;
        font-size: 14px;
        color: var(--text-color);
        font-weight: 500;
        outline: none;
    }
    input::placeholder {
        color: var(--primary-head);
    }
    .chat_footer .nav_icon {
        width: 28px;
        height: 28px;
        margin: auto 10px;
    }
    .chat_footer button {
        display: flex;
        background-color: transparent;
        border: none;
        margin: 10px 0;
    }
    .chat_footer button:hover {
        cursor: pointer;
    }
    .chat_footer button img {
        height: 24px;
        width: 24px;
    }
    .title_box {
        display: inline-flex;
        flex-direction: column;
        text-align: center;
        flex: 1 1 auto;
        margin: auto;
    }
    .title {
        font-size: 16px;
    }
    .count {
        font-size: 14px;
        color: var(--primary-color);
    }
    .back, .info {
        width: 100px;
    }
    .back {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 15px;
        justify-content: space-around;
    }
    .info {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 10px 15px 10px 0;
    }
    .avatar {
        border-radius: 50%;
    }

    .chat_messages {
        display: flex;
        flex-direction: column;
        max-height: 82vh;
        overflow-y: auto;
    }

    .message {
        display: flex;
        flex-direction: row;
        margin: 0 15px;
        padding: 10px;
        align-self: flex-start;
    }
    .content {
        word-wrap: break-word;
        min-width: 90px;
        max-width: 400px;
        margin: 0 10px;
        padding: 10px 15px;
        border-radius: 20px;
        background-color: var(--primary-color);
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .icon img {
        width: 40px;
    }
    .text {
        word-wrap: break-word;
    }
</style>