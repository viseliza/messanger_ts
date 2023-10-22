<script lang="ts">
    import { page } from "$app/stores";
</script>

<footer>
    <div class="footer">
        <div class="row">
            <a target="_blank" href="https://vk.com/novsuru"><i class="fa fa-vk" /></a>
            <a target="_blank" href="https://t.me/news_novsu"><i class="fa fa-telegram" /></a>
            <a target="_blank" href="https://www.youtube.com/@novsu_ru"><i class="fa fa-youtube" /></a>
            <a target="_blank" href="https://novsu.ru"><i class="fa fa-google" /></a>
        </div>

        <div class="row">
            <ul>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Our Services</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Career</a></li>
            </ul>
        </div>

        <div class="row">
            INFERNO Copyright © 2021 Inferno - All rights reserved || Designed
            By: Mahesh
        </div>
    </div>
</footer>

<style>
    .footer {
        background: #000;
        padding: 30px 0px;
        font-family: "Play", sans-serif;
        text-align: center;
    }

    .footer .row {
        width: 100%;
        margin: 1% 0%;
        padding: 0.6% 0%;
        color: gray;
        font-size: 0.8em;
    }

    .footer .row a {
        text-decoration: none;
        color: gray;
        transition: 0.5s;
    }

    .footer .row a:hover {
        color: #fff;
    }

    .footer .row ul {
        width: 100%;
    }

    .footer .row ul li {
        display: inline-block;
        margin: 0px 30px;
    }

    .footer .row a i {
        font-size: 2em;
        margin: 0% 1%;
    }

    @media (max-width: 720px) {
        .footer {
            text-align: left;
            padding: 5%;
        }
        .footer .row ul li {
            display: block;
            margin: 10px 0px;
            text-align: left;
        }
        .footer .row a i {
            margin: 0% 3%;
        }
    }
</style>
