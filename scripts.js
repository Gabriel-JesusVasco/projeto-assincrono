const botaoUpl = document.getElementById("carregar");
const areaUpload = document.getElementById("arquivo");
const imagem = document.querySelector(".imagem_index");
const nomeArquivo = document.querySelector(".area_nome_img p");
const caixaTag = document.getElementById("tags");
const listaTags = document.getElementById("lista");
const tagsPredefinidas = ["Back-end", "Front-end", "Data-science", "DevOps", "Programação", "Projeto", "Estudo"];
const botaoPublicar = document.getElementById("publicar");
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
                    alert("Digite uma Tag permitida, tags relacionadas a programação")
                    caixaTag.value = "";
                }

            } catch (erro) {
                alert("Erro na verificação da tag")
            }
        }
    }
})
botaoPublicar.addEventListener("click", async(evento)=>{
    evento.preventDefault();
    const nomeUpload = document.getElementById("")
})