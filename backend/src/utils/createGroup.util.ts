interface Param {
    name: String;
    href: String;
}

export default async function (data: Param) {
    try {
        const response = await fetch("http://localhost:3000/group/auth", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(await response.json());
    } catch (error) {
        console.error("Ошибка:", error);
    }
}