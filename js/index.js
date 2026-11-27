let slideIndex = 1;
mostrarSlides(slideIndex);

function mudarSlide(n) {
  mostrarSlides((slideIndex += n));
}

function mostrarSlides(n) {
  const slides = [
    document.querySelector(".slide"),
    document.querySelector(".slide2"),
  ];

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((slide) => {
    if (slide) slide.style.display = "none";
  });

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
  }
}

const btnDark = document.getElementById('btn-dark');

btnDark.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    btnDark.textContent = 'Modo Claro';
    btnDark.style.backgroundColor = '#ffffff';
    btnDark.style.color = '#121212';
  } else {
    btnDark.textContent = 'Modo Escuro';
    btnDark.style.backgroundColor = '#212529';
    btnDark.style.color = '#ffffff';
  }
});

function abrirModal(nome, preco, km, combustivel, cambio, imagem) {

    document.getElementById("modal-nome").textContent = nome;

    document.getElementById("modal-preco").textContent = preco;

    document.getElementById("modal-km").textContent = km;

    document.getElementById("modal-combustivel").textContent = combustivel;

    document.getElementById("modal-cambio").textContent = cambio;

    document.getElementById("modal-imagem").src = imagem;

    document.getElementById("modal-veiculo").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal-veiculo").style.display = "none";
}

function mostrarPreview() {
  const input = document.getElementById("fotos");
  const grid = document.getElementById("preview");

  grid.innerHTML = "";

  for (const file of input.files) {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.style.cssText = "position: absolute; top: 5px; right: 5px; background-color: red; color: white; border: none; cursor: pointer;";
    btn.onclick = () => wrapper.remove();

    wrapper.appendChild(img);
    wrapper.appendChild(btn);
    grid.appendChild(wrapper);
  }
}

document.getElementById('fotos').addEventListener('change', mostrarPreview);   

