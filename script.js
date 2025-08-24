const numerosContainer = document.getElementById('numeros-meta');
const metaTotal = 20000; // Meta
const totalDepositos = 200; // Números de 1 a 200

// Recupera depósitos já adicionados
let depositosFeitos = localStorage.getItem('depositosFeitos')
    ? JSON.parse(localStorage.getItem('depositosFeitos'))
    : [];

// Gera os números de 1 a 200
for (let i = 1; i <= totalDepositos; i++) {
    const div = document.createElement('div');
    div.classList.add('numero');
    div.innerText = i;
    numerosContainer.appendChild(div);
}

// Recupera saldo do LocalStorage
let saldo = localStorage.getItem('saldo') ? parseFloat(localStorage.getItem('saldo')) : 0;
document.getElementById('saldo').innerText = saldo.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
atualizarNumeros();

// Adiciona depósito
function adicionar() {
    let valorInput = parseInt(document.getElementById('valor').value);
    let msg = document.getElementById('mensagem');

    if (isNaN(valorInput) || valorInput < 1 || valorInput > totalDepositos) {
        msg.innerText = 'Digite um número válido de 1 a 200!';
        msg.style.color = 'red';
        return;
    }

    if (depositosFeitos.includes(valorInput)) {
        msg.innerText = 'Deposito já incluso!';
        msg.style.color = 'orange';
        return;
    }

    // Adiciona ao saldo
    saldo += valorInput;
    depositosFeitos.push(valorInput);

    localStorage.setItem('saldo', saldo);
    localStorage.setItem('depositosFeitos', JSON.stringify(depositosFeitos));

    document.getElementById('saldo').innerText = saldo.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
    document.getElementById('valor').value = '';
    msg.innerText = 'Depósito adicionado com sucesso!';
    msg.style.color = 'green';
    atualizarNumeros();
}

// Resetar saldo
function resetar() {
    if (confirm('Tem certeza que deseja resetar o saldo?')) {
        saldo = 0;
        depositosFeitos = [];
        localStorage.setItem('saldo', saldo);
        localStorage.setItem('depositosFeitos', JSON.stringify(depositosFeitos));
        document.getElementById('saldo').innerText = saldo.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
        document.getElementById('mensagem').innerText = 'Saldo resetado!';
        document.getElementById('mensagem').style.color = 'blue';
        atualizarNumeros();
    }
}

// Atualiza números verdes e falta para a meta
function atualizarNumeros() {
    const numeroDivs = document.querySelectorAll('.numero');
    numeroDivs.forEach((div, index) => {
        const numeroAtual = index + 1;
        if (depositosFeitos.includes(numeroAtual)) {
            div.classList.add('registrado');
        } else {
            div.classList.remove('registrado');
        }
    });

    const falta = Math.max(metaTotal - saldo, 0);
    document.getElementById('falta').innerText = falta.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
}
