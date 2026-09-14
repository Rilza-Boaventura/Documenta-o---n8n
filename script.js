//===============================
// DOCUMENTAÇÃO n8n
// NAVEGAÇÃO + PESQUISA
// ===============================

const sections = document.querySelectorAll(".section");
const menuLinks = document.querySelectorAll(".sidebar a");
const searchInput = document.getElementById("searchInput");


// ===============================
// MOSTRAR UMA ÚNICA SEÇÃO
// ===============================

function mostrarSecao(id) {

    sections.forEach(function(section) {
        section.style.display = "none";
    });

    const secaoSelecionada = document.getElementById(id);

    if (secaoSelecionada) {
        secaoSelecionada.style.display = "block";
    }

    // Volta a página para o topo
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// MENU LATERAL
// ===============================

menuLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const id = link.getAttribute("href").replace("#", "");

        // Limpa a pesquisa
        searchInput.value = "";

        // Mostra somente a seção escolhida
        mostrarSecao(id);

    });

});


// ===============================
// BOTÃO "COMEÇAR AGORA"
// ===============================

const button = document.querySelector(".button");

if (button) {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        searchInput.value = "";

        mostrarSecao("introducao");

    });

}


// ===============================
// PESQUISA
// ===============================

searchInput.addEventListener("input", function() {

    const busca = searchInput.value
        .toLowerCase()
        .trim();


    // Se apagar a pesquisa, volta para o início
    if (busca === "") {

        mostrarSecao("inicio");

        return;
    }


    let encontrou = false;


    sections.forEach(function(section) {

        const keywords = section.dataset.keywords || "";

        const titulo = section.querySelector("h2");

        const textoTitulo = titulo
            ? titulo.innerText.toLowerCase()
            : "";


        const encontrouKeyword =
            keywords.toLowerCase().split(" ").includes(busca);

        const encontrouTitulo =
            textoTitulo.includes(busca);


        if (encontrouKeyword || encontrouTitulo) {

            section.style.display = "block";

            encontrou = true;

        } else {

            section.style.display = "none";

        }

    });


    // Se não encontrar nada
    if (!encontrou) {

        sections.forEach(function(section) {
            section.style.display = "none";
        });

    }

});


// ===============================
// INÍCIO
// ===============================

mostrarSecao("inicio");
