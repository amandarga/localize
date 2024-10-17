document.getElementById('btn-loc').addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(mostrarLocalizacao, mostrarErro);
    } else {
        document.getElementById('status').innerHTML = "Geolocalização não suportada pelo navegador.";
    }
});

function mostrarLocalizacao(posicao) {
    const latitude = posicao.coords.latitude;
    const longitude = posicao.coords.longitude;
    
    
    
    // Exibe o mapa com a localização do usuário
    const mapa = document.getElementById('mapa');
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
    mapa.innerHTML = `<iframe src="${mapUrl}" width="100%" height="300px"></iframe>`;
}

function mostrarErro(erro) {
    switch (erro.code) {
        case erro.PERMISSION_DENIED:
            document.getElementById('status').innerHTML = "Permissão negada pelo usuário.";
            break;
        case erro.POSITION_UNAVAILABLE:
            document.getElementById('status').innerHTML = "Posição não disponível.";
            break;
        case erro.TIMEOUT:
            document.getElementById('status').innerHTML = "Tempo de solicitação expirado.";
            break;
        default:
            document.getElementById('status').innerHTML = "Erro desconhecido.";
            break;
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(function(error) {
        console.log('Falha ao registrar o Service Worker:', error);
    });
}
