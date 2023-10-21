'use strict'

const API_KEY = "cf86a591dd414ef49c000ccbde24733b";

// General Utilities
const cardContainer = document.querySelector(".card-container");
const cardTemplate = document.querySelector("#template-card");
const navListContainer = document.querySelector("nav .navlist");
const navitemArray = document.querySelectorAll(".nav_item");
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

// On load
window.addEventListener("load",fetchNews("India"));

// Fetch News
async function fetchNews(query){
    const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

// Bind Data
function bindData(articleArray){
    cardContainer.innerHTML = "";
    articleArray.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone =  cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    })
}

// Fill Data in card
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

// After clicking on each card detailed news opens
cardContainer.addEventListener("click",function(ev){
    if(ev.target.closest('.card')){
        const card = ev.target.closest('.card');
        const linkTopage = card.querySelector("#pForurl").innerHTML;
        window.open(linkTopage, "_blank");
    }
});

// Navlist quick links 
navListContainer.addEventListener("click",function(ev){
    ev.preventDefault();
    if(ev.target.classList.contains('nav_item')){

        navitemArray.forEach((tag)=>{
            tag.classList.remove("active");
        })
        ev.target.classList.add("active");

        const query = ev.target.textContent;
        fetchNews(query);
    }
});

// Searching news in input
searchButton.addEventListener("click",function(){
    if(!searchInput.value)  return;
    fetchNews(searchInput.value);
    navitemArray.forEach((tag)=>{
        tag.classList.remove("active");
    })
})