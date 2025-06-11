document.addEventListener("DOMContentLoaded", function() {
    const intro = document.getElementById("intro");

    // Garante que ele esteja visível e o scroll desativado ao carregar
    intro.style.display = "flex";
    document.body.style.overflow = "hidden";

    function removerIntro() {
        if (intro) {
            intro.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Oculta após 7 segundos ou se o usuário interagir
    setTimeout(removerIntro, 7000);
    document.addEventListener("click", removerIntro, { once: true });
    document.addEventListener("scroll", removerIntro, { once: true });

    // Carrossel Quem Somos (já existente)
    const carrosselInner = document.querySelector(".carrossel-inner");
    if (carrosselInner) {
        const slides = document.querySelectorAll(".slide");
        const totalSlides = slides.length;
        let index = 0;
        const slidesToShow = 3;

        function trocarImagem() {
            if (index >= totalSlides - slidesToShow) {
                index = 0;
            } else {
                index++;
            }
            const slideWidth = slides[0].clientWidth;
            carrosselInner.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        setInterval(trocarImagem, 5000);
    }

    // Carrossel de Serviços (novo)
    const carrosselInnerServicos = document.querySelector(".carrossel-inner-servicos");
    const slidesServicos = document.querySelectorAll(".slide-servico");
    const bolinhas = document.querySelectorAll(".botoes-carrossel .bolinha");
    if(carrosselInnerServicos && slidesServicos.length && bolinhas.length) {
        const totalSlides = slidesServicos.length;
        let indexServicos = 0;
        const slidesToShow = 3;

        function atualizarCarrossel(novoIndex) {
            indexServicos = novoIndex !== undefined ? novoIndex : (indexServicos + 1) % totalSlides;

            // calcula largura do slide incluindo padding
            const slideWidth = slidesServicos[0].clientWidth + 20; // 10px padding lateral * 2

            // limitar para não passar do máximo possível
            const maxIndex = totalSlides - slidesToShow;
            if (indexServicos > maxIndex) indexServicos = 0;

            carrosselInnerServicos.style.transform = `translateX(-${indexServicos * slideWidth}px)`;

            bolinhas.forEach((b, i) => b.classList.toggle("ativa", i === indexServicos));
        }

        let intervalo = setInterval(() => atualizarCarrossel(), 5000);

        bolinhas.forEach((bolinha, i) => {
            bolinha.addEventListener("click", () => {
                clearInterval(intervalo);
                atualizarCarrossel(i);
                intervalo = setInterval(() => atualizarCarrossel(), 5000);
            });
        });
    }
});

  document.getElementById("form-whatsapp").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const titulo = document.getElementById("titulo").value;
    const mensagem = document.getElementById("mensagem").value;

    const texto = `*Novo Contato do Site:*\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Título:* ${titulo}\n*Mensagem:* ${mensagem}`;

    const numero = "5561984084390"; // Ex: 5511999999999
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  });

const slideWidth = slides[0].offsetWidth;
if (window.innerWidth < 768) {
    document.body.style.transform = "scale(0.5)";
    document.body.style.transformOrigin = "top left";
    document.body.style.width = "200%";
}
let intervalo = setTimeout(function loopCarrossel() {
    atualizarCarrossel();
    intervalo = setTimeout(loopCarrossel, 5000);
}, 5000);
