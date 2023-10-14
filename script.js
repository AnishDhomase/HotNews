const API_KEY = "cf86a591dd414ef49c000ccbde24733b";
const cardContainer = document.querySelector(".card-container");
const cardTemplate = document.querySelector("#template-card");
const navListContainer = document.querySelector("nav .navlist");
const navitemArray = document.querySelectorAll(".nav_item");
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

searchButton.addEventListener("click",function(){
    if(!searchInput.value)  return;
    fetchNews(searchInput.value);
    navitemArray.forEach((tag)=>{
        tag.classList.remove("active");
    })
})


window.addEventListener("load",fetchNews("India"));

navListContainer.addEventListener("click",function(ev){
    navitemArray.forEach((tag)=>{
        tag.classList.remove("active");
    })
    ev.target.classList.add("active");
    ev.preventDefault();
    if(ev.target.classList.contains('nav_item')){
        const query = ev.target.textContent;
        fetchNews(query);
    }
});

cardContainer.addEventListener("click",function(ev){
    if(ev.target.closest('.card')){
        const card = ev.target.closest('.card');
        const linkTopage = card.querySelector("#pForurl").innerHTML;
        window.open(linkTopage, "_blank");
    }
});

async function fetchNews(query){
    const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articleArray){
    cardContainer.innerHTML = "";
    articleArray.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone =  cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const cardImg = cardClone.querySelector("#card-img");
    const cardTitle = cardClone.querySelector("#card-title");
    const cardAgency = cardClone.querySelector("#card-agency");
    const cardPara = cardClone.querySelector("#card-para");
    const cardLink = cardClone.querySelector("#pForurl");

    cardImg.src = article.urlToImage;
    cardTitle.innerHTML = article.title;
    cardAgency.innerHTML = article.source.name;
    cardPara.innerHTML = article.description;
    cardLink.innerHTML = article.url;
}