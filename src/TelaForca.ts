import { Forca } from "./Forca.js";

class TelaForca {
  pnlConteudo: HTMLElement;
  pnlPalavra: HTMLElement;
  pbImagemForca: HTMLImageElement;
  lblDica: HTMLElement;
  pnlTeclado: HTMLElement;
  btnReset: HTMLButtonElement;
  jogoDaForca: Forca;

  constructor() {
    this.pnlConteudo = document.getElementById('pnlConteudo')!;
    this.pnlPalavra = document.getElementById('pnlPalavra')!;
    this.pbImagemForca = document.getElementById('pbImagemForca') as HTMLImageElement;
    this.lblDica = document.getElementById('lblDica')!;
    this.pnlTeclado = document.getElementById('pnlTeclado')!;
    this.btnReset = document.getElementById('btnReset') as HTMLButtonElement;
    this.jogoDaForca = new Forca();
    
    this.registrarEventos();
    this.obterPalavraParcial();
    this.obterDicaPalavra();
  }

  registrarEventos() {
    for (let botao of this.pnlTeclado.children as HTMLCollectionOf<HTMLButtonElement>) {
      botao.addEventListener('click', () => this.darPalpite(botao));
      botao.addEventListener('click', () => this.atualizarBotoes(botao));
    }

    this.btnReset.addEventListener('click', () => this.reiniciarJogo());
  }

  reiniciarJogo() {
    this.jogoDaForca = new Forca();

    this.obterPalavraParcial();

    this.obterDicaPalavra();

    this.atualizarForca();

    this.pnlConteudo.querySelector('.notificacao')?.remove();

    for (let botao of this.pnlTeclado.children as HTMLCollectionOf<HTMLButtonElement>)
      botao.disabled = false;
  }

  atualizarBotoes(botaoClicado: HTMLButtonElement) {
    botaoClicado.disabled = true;
  }

  darPalpite(botaoClicado: HTMLButtonElement) {
    const palpite = botaoClicado.textContent![0];

    if (this.jogoDaForca.jogar(palpite) || this.jogoDaForca.jogadorPerdeu()) {
      this.finalizarJogo();
    }

    this.obterPalavraParcial();

    this.atualizarForca();
  }

  finalizarJogo() {
    const jogadorPerdeu = this.jogoDaForca.jogadorPerdeu();

    const lblMensagemFinal = document.createElement('p');

    lblMensagemFinal.classList.add('notificacao');
    lblMensagemFinal.textContent = this.jogoDaForca.mensagemFinal;

    if (jogadorPerdeu)
      lblMensagemFinal.classList.add('notificacao-erro');
    else
      lblMensagemFinal.classList.add('notificacao-acerto');

    this.pnlConteudo.appendChild(lblMensagemFinal);

    for (let botao of this.pnlTeclado.children as HTMLCollectionOf<HTMLButtonElement>) {
      if (botao.textContent != 'Reiniciar')
        botao.disabled = true;
    }
  }

  obterPalavraParcial() {
    this.pnlPalavra.innerHTML = '';

    const palavraSecreta = this.jogoDaForca.obterPalavraParcial();

    for (let i = 0; i < palavraSecreta.length; i++) {
      const lblLetra = document.createElement('p');
      lblLetra.textContent = palavraSecreta[i];

      this.pnlPalavra.appendChild(lblLetra);
    }
  }

  atualizarForca() {
    const imagensForca = [
      'forca00',
      'forca01',
      'forca02',
      'forca03',
      'forca04',
      'forca05',
      'forca06',
      'forca07',
    ];

    this.pbImagemForca.src = `assets/${
      imagensForca[this.jogoDaForca.erros]
    }.png`;
  }

  obterDicaPalavra() {
    this.lblDica.textContent = `${this.jogoDaForca.obterQuantidadeLetras()} letras`;
  }
}

window.addEventListener('load', () => new TelaForca());