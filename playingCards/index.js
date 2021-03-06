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
  static startGame(amountOfPlayer, gameMode) {
    let table = {
      players: [],
      deck: new Deck(),
      gameMode: gameMode,
    };
    table.deck.shuffleDeck();

    for (let i = 0; i < amountOfPlayer; i++) {
      let playerHand = [];
      for (let i = 0; i < Dealer.initialCards(table.gameMode); i++) {
        playerHand.push(table.deck.draw());
      }
      table.players.push(playerHand);
    }
    return table;
  }

  static initialCards(gameMode) {
    if (gameMode === "poker") return 5;
    if (gameMode === "21") return 2;
  }

  // 卓を引数に入れる
  static printTableInformation(table) {
    console.log(`Amount of players: ${table.players.length}`);
    console.log(`Mode:${table.gameMode}.at this table`);
    for (let i = 0; i < table.players.length; i++) {
      console.log(`player${i + 1}hand is`);
      for (let j = 0; j < table.players[i].length; i++) {
        console.log(table.players[i][j].getCardString());
      }
    }
  }

  // 21の結果を返す関数
  static score21Individual(cards) {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      sum += cards[i].intValue;
    }
    if (sum > 21) sum = 0;
    return sum;
  }
}

// 計算だけを行う関数
class HelperFunctions {
  // [1, 6, 6, 4, 13] => 13
  static maxInArrayIndex(intArr) {
    let maxNum = 0;

    for (let i = 0; i < intArr.length; i++) {
      if (intArr[i] > maxNum) {
        maxNum = intArr[i];
      }
    }

    return maxNum;
  }
}

const deck1 = new Deck();
deck1.shuffleDeck();
let table1 = Dealer.startGame(4, "21");
// Dealer.score21Individual(table1.players[0]);

// table1の優勝者
let arr = [];
for (let i = 0; i < table1.players.length; i++) {
  arr.push(Dealer.score21Individual(table1.players[i]));
}

// 勝者の点数を出力
console.log(HelperFunctions.maxInArrayIndex(arr));
