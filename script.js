function limpar() {
    document.getElementById('busca').value = ("")
    document.getElementById('res').style.display = 'none';
    document.getElementById('opc').value = 'none';
}

async function pesquisapost() {
    var opcao = document.getElementById('opc').value;
    var termo = document.getElementById('busca').value;
    var resultado = document.getElementById('res');
    var listaResultados = document.getElementById('resposta');

    while (listaResultados.firstChild) {
        listaResultados.removeChild(listaResultados.firstChild);
    }

    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

    var filteredPosts = response.data.filter(function (post) {
        if (opcao == 'uid') {
            return post.userId.toString() === termo;
        } else if (opcao === 'pid') {
            return post.id.toString() === termo;
        } else if (opcao === 'titulo' && post.title.includes(termo)) {
            return true;
        } else if (opcao === 'conteudo' && post.body.includes(termo)) {
            return true;
        }
        return false;
    });

    if (filteredPosts.length > 0) {
        resultado.style.display = 'block';
        var listaResultados = document.getElementById('resposta');

        filteredPosts.forEach(function (post) {
            var item = document.createElement('li');
            item.innerHTML = `<strong>User ID: </strong>${post.userId}<br>
            <strong>Post ID: </strong>${post.id}<br>
            <strong>Title: </strong>${post.title}<br>
            <strong>Body: </strong>${post.body}<br><br>`;
            listaResultados.appendChild(item);
        });
        
        resultado.appendChild(listaResultados); 
        
    } else {
        resultado.style.display = 'none';
        window.alert('Nenhum resultado encontrado.');
    }

}