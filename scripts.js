const botaoUpl = document.getElementById("carregar");
const areaUpload = document.getElementById("arquivo");
const imagem = document.querySelector(".imagem_index");
const nomeArquivo = document.querySelector(".area_nome_img p");
const caixaTag = document.getElementById("tags");
const listaTags = document.getElementById("lista");
const tagsPredefinidas = ["Back-end", "Front-end", "Data-science", "DevOps", "Programação", "Projeto", "Estudo"];
const botaoPublicar = document.getElementById("publicar");
const descartar = document.getElementById("descartar");
const form = document.querySelector("form")
botaoUpl.addEventListener("click", () => {
    areaUpload.click();
})
function lerArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitorArquivo = new FileReader();
        leitorArquivo.onload = () => {
            resolve({ url: leitorArquivo.result, nome: arquivo.name });
        }
        leitorArquivo.onerror = () => {
            reject(`Erro na leitura do arquivo com nome: ${leitorArquivo.name}`);
        }
        leitorArquivo.readAsDataURL(arquivo);
    })
}
areaUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
        try {
            const conteudo = await lerArquivo(arquivo);
            imagem.src = conteudo.url;
            nomeArquivo.textContent = conteudo.nome;
        } catch (error) {
            alert("Erro no seu arquivo")
        }
    }
})

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remover_tag")) {
        const tagRemovida = evento.target.parentElement;
        listaTags.removeChild(tagRemovida)
    }
})
async function verificacao(nomeTag) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsPredefinidas.includes(nomeTag))
        }, 1000);
    });
}
caixaTag.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const nomeTag = caixaTag.value.trim();
        if (nomeTag !== "") {
            const tagExistente = await verificacao(nomeTag)
            try {
                if (tagExistente) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${nomeTag}</p> <img src="img/fechar.svg" alt="Imagem de fechar" class="remover_tag">`;
                    listaTags.appendChild(tagNova);
                    caixaTag.value = "";
                }
                else {
                    alert("Digite uma Tag permitida, tags relacionadas a programação");
                    caixaTag.value = "";
                }

            } catch (erro) {
                alert("Erro na verificação da tag");
            }
        }
    }
})
async function publicar(nomeUpload, descricao, tagsVisualizacao) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const aprovada = Math.random() > 0.5;
            if (aprovada) {
                resolve("Parábens, seu projeto foi públicado!");
            }
            else {
                reject("Que tristeza! Infelizmente seu projeto não foi públicado");
            }
        }, 1500);
    })
}
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();
    const nomeUpload = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const tagsVisualizacao = Array.from(listaTags.querySelectorAll("p")).map((tagNova) => tagNova.textContent);
    console.log(nomeUpload);
    console.log(descricao);
    console.log(tagsVisualizacao);

    try {
        const aprovacaoPublicar = await publicar(nomeUpload, descricao, tagsVisualizacao)
        alert("Parábens, projeto foi publicado")
    } catch (erro) {
        alert(erro)
    }
})
descartar.addEventListener("click", (evento)=>{
    evento.preventDefault();
    form.reset();
    imagem.src = "img/imagem1.png";
    nomeArquivo.textContent = "img.png";
    listaTags.innerHTML = "";
})