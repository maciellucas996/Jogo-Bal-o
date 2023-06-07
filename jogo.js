var timerId = null; //variavel que armazena a chamada da função timeout

function iniciaJogo() {

	var url = window.location.search; //recupera apenas o que está a partir do ?

	var nivel_jogo = url.replace("?", "");

	var tempo_seg = 0;

	if (nivel_jogo == 1) {//facil - 120s
		tempo_seg = 120;
	}

	if (nivel_jogo == 2) {//normal - 60s
		tempo_seg = 60;
	}

	if (nivel_jogo == 3) {//dificil - 30s
		tempo_seg = 30;
	}

	//inserir os seg no span
	document.getElementById('cronometro').innerHTML = tempo_seg;

	//criação baloes

	var qtd_baloes = 100;

	cria_baloes(qtd_baloes);

	//imprimir qtd baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;

	//imprimir baloes estourados:
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_seg + 1);
}

function contagem_tempo(segundos) {
	
	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerId); //para a execução da função do settimerout
		game_over ();
		return false
	} 

	document.getElementById('cronometro').innerHTML = segundos;
	timerId = setTimeout('contagem_tempo('+segundos+')', 1000);
}

function game_over() {

	remove_eventos_baloes();
	alert('Fim de Jogo!! Você não conseguiu estourar todos os balões a tempo!')
}

function cria_baloes(qtd_baloes) {
	for (var i = 1; i <= qtd_baloes; i++) {

		var balao = document.createElement('img');
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '5px';
		balao.id = 'b'+i;
		balao.onclick = function() { estourar(this); };

		//appendChild poe as tags filhas(img) dentro do pai(div)
		document.getElementById('cenario').appendChild(balao);

	}
}

function estourar (e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute('onclick', '');

	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png'

	pontuacao(-1);
}

function pontuacao (acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo (baloes_inteiros);
}

function situacao_jogo (baloes_inteiros){
	if (baloes_inteiros == 0) {
		alert('Parabéns!! Você ganhou!');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}
		
