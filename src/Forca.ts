export class Forca {
  erros: number = 0;
  mensagemFinal: string = '';
  palavraSecreta: string = '';
  letrasEncontradas: string[] = [];

  constructor() {
    this.palavraSecreta = this.obterPalavraSecreta();
    this.letrasEncontradas = this.popularLetrasEncontradas(this.palavraSecreta.length);
    console.log(this.palavraSecreta);
  }

  obterQuantidadeErros() {
    return this.erros;
  }

  obterQuantidadeLetras() {
    return this.palavraSecreta.length;
  }

  obterPalavraParcial() {
    return this.letrasEncontradas.join('');
  }

  jogar(palpite: string) {
    // testar a letra
    let letraFoiEncontrada = false;

    for (let i = 0; i < this.obterQuantidadeLetras(); i++) {
      if (palpite == this.palavraSecreta[i]) {
          this.letrasEncontradas[i] = palpite;
          letraFoiEncontrada = true;
      }
    }
    // checar se jogador acertou
    if (letraFoiEncontrada === false)
      this.erros++;

    const jogadorAcertou = this.obterPalavraParcial() === this.palavraSecreta;

    // definir a mensagem final do jogo
    if (jogadorAcertou)
      this.mensagemFinal = `Você acertou a palavra ${this.palavraSecreta}, parabéns!`;

    else if (this.jogadorPerdeu())
      this.mensagemFinal = 'Você perdeu! Tente novamente...'

    console.log(this.palavraSecreta);
    
    return jogadorAcertou;
  }

  jogadorPerdeu() {
    return this.obterQuantidadeErros() === 7;
  }

  obterPalavraSecreta() {
    const palavras: string[] = [
      "ABACATE", "ABACAXI", "ACEROLA", "ACAI", "ARACA", "ABACATE", "BACABA", 
      "BACURI", "BANANA", "CAJA", "CAJU", "CARAMBOLA", "CUPUACU", "GRAVIOLA", 
      "GOIABA", "JABUTICABA", "JENIPAPO", "MACA", "MANGABA", "MANGA", "MARACUJA", 
      "MURICI", "PEQUI", "PITANGA", "PITAYA", "SAPOTI", "TANGERINA", "UMBU", 
      "UVA", "UVAIA"
    ];

    const indiceAleatorio: number = Math.floor(Math.random() * palavras.length);

    return palavras[indiceAleatorio];
  }

  popularLetrasEncontradas(tamanho: number) {
    const letrasEncontradas: string[] = new Array(tamanho).fill('_');

    return letrasEncontradas;
  }
}