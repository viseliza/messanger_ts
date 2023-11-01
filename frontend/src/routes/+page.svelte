<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    const schedule = data.schedule.split("\n");
	const replacement = data.replacement.split("\n\n");
	console.log(replacement)
    const days_array = [
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
    ];
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Расписание</h1>
    <table>
        {#each schedule as row, index}
            {#if row}
                <tr>
                    {#if days_array.includes(row.toLowerCase().trim())}
                        <th colspan="2">{row}</th>
                    {:else if schedule[index].split(" ")[0] == schedule[index + 1].split(" | ")[0]}
                        <td rowspan="2">{row.split(" | ")[0]}</td>
                        <td>{row.split(" | ")[1]}</td>
                    {:else if schedule[index -1].split(" ")[0] == schedule[index].split(" | ")[0]}
                        <td>{row.split(" | ")[1]}</td>
                    {:else}
                        <td>{row.split(" | ")[0]}</td>
                        <td>{row.split(" | ")[1]}</td>
                    {/if}
                </tr>
            {/if}
        {/each}
    </table>
	<h1>Замены</h1>
	<table>
		{#each replacement as row}
			{#if row}
				<tr>
					<td>{row.split('\n')[0]}</td>
					<td>{row.split('\n')[1]}</td>
					<td>{row.split('\n')[2]}</td>
				</tr>
			{/if}
		{/each}
	</table>
</section>

<style>
    table {
        width: 800px;
        border-collapse: collapse;
        overflow: hidden;
        box-shadow: 0 0 20px var(--box-shadow);
    }
    th,
    td {
        padding: 15px;
        background-color: rgba(255, 255, 255, 0.2);
        color: var(--text-color);
    }
    th {
		padding: 20px;
        text-align: center;
		background-color: var(--primary-head);
    }
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    h1 {
        width: 100%;
    }

    .welcome {
        display: block;
        position: relative;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% * 495 / 2048) 0;
    }

    .welcome img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: block;
    }
</style>
