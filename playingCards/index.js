class Card {
  constructor(suit, value, intValue) {
    this.suit = suit;
    this.value = value;
    this.intValue = intValue;
  }

  /* カード情報のみを表示する */
  getCardString() {
    return this.suit + this.value + "(" + this.intValue + ")";
  }
}

// デッキクラス
class Deck {
  constructor() {
    this.deck = Deck.generateDeck();
  }
  static generateDeck() {
    let newDeck = [];
    const suits = ["♣", "♦", "♥", "♠"];
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        newDeck.push(new Card(suits[i], values[j], j + 1));
      }
    }
    return newDeck;
  }

  // カードの情報を表示s
  printDeck() {
    for (let i = 0; i < this.deck.length; i++) {
      const card = new Card(
        this.deck[i].suit,
        this.deck[i].value,
        this.deck[i].intValue
      );
      console.log(card.getCardString());
    }
  }
  shuffleDeck() {
    let newDeck = this.deck;

    for (let i = newDeck.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = newDeck[i];
      newDeck[i] = newDeck[j];
      newDeck[j] = temp;
    }
  }
  draw() {
    return this.deck.pop();
  }
}

// ゲームを管理するクラス
class Dealer {
  // 卓の情報を作成しプレイヤーに2枚ずつカードを配る
  static startGame(amountOfPlayer) {
    let table = {
      players: [],
      deck: new Deck(),
    };
    table.deck.shuffleDeck();

    for (let i = 0; i < amountOfPlayer; i++) {
      let playerHand = [];
      for (let i = 0; i < 2; i++) {
        playerHand.push(table.deck.draw());
      }
      table.players.push(playerHand);
    }
    return table;
  }
}
const deck1 = new Deck();
deck1.shuffleDeck();
console.log(Dealer.startGame(2));
