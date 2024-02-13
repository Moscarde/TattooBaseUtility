function showFlashAlert(mensagem, type) {
    var flashAlert = document.getElementById('flash-alert');
    var iconElement = flashAlert.querySelector('i');
    var closeButton = flashAlert.querySelector('.btn-close');

    // Defina a classe e o ícone com base no type (success, error, etc.)
    flashAlert.classList.add('alert-' + type);
    iconElement.className = 'bi ' + (type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill');

    // Adicione a mensagem ao alerta
    flashAlert.innerHTML += " " + mensagem;

    // Exiba o alerta
    flashAlert.classList.add('show');

    // Configure um temporizador para ocultar o alerta após 5 segundos
    setTimeout(function () {
        // Limpe a mensagem e remova a classe de tipo
        flashAlert.innerHTML = '<i class="bi"></i>';
        flashAlert.classList.remove('alert-' + type);

        // Oculte o alerta
        flashAlert.classList.remove('show');
    }, 5000);
}