new Vue({
  el: '#app',
  data: {
    playerHealth: 0,
    monsterHealth: 0,
    gameIsRunnung: false,
    turns : []
  },
  methods: {
    startGame: function() {
      this.gameIsRunnung = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.monsterAttacks();
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage
      });
      if (this.checkWin()){
        return;
      }
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10,20);
      this.monsterHealth -= damage;
      this.monsterAttacks();
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster hard for ' + damage
      });
      if (this.checkWin()){
        return;
      }
    },
    heal: function () {
      if(this.playerHealth <= 90){
        this.playerHealth += 10;
      }else {
        this.playerHealth = 100;
      }
      this.monsterAttacks();
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10 '
      });

    },
    giveUp: function() {
      this.gameIsRunnung = false;
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(5,12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage
      });
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunnung = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunnung = false;
        }
        return true;
      }
      return false;
    }
  }

});
