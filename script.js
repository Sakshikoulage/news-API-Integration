async function getNews() {

    const apiKey = "2baf23d03ceea0a62fe5f03ff3323705"; // GNews API Key
    const search = document.getElementById("search").value;
    const category = document.getElementById("category").value;
    const loader = document.getElementById("loader");
    const newsDiv = document.getElementById("news");

    loader.style.display = "block";
    newsDiv.innerHTML = "";

    let url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&apikey=${apiKey}`;

    if (search) {
        url = `https://gnews.io/api/v4/search?q=${search}&lang=en&apikey=${apiKey}`;
    }

    if (category) {
        url += `&topic=${category}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        loader.style.display = "none";

        let output = "";

        data.articles.forEach(article => {
            output += `
                <div class="news-card">
                    <h3>${article.title}</h3>
                    <p>${article.description || ""}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
                </div>
            `;
        });

        newsDiv.innerHTML = output || "No news found";

    } catch (error) {
        loader.style.display = "none";
        newsDiv.innerHTML = "Error loading news ❌";
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
