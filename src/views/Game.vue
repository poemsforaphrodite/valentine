<template>
    <div class="game-container">
        <h2>Matrix Game</h2>

        <div class="matrix-container">
            <div class="matrix computer-matrix">
                <h3>Computer's Matrix</h3>
                <table>
                    <tr v-for="(row, rowIndex) in computerMatrix" :key="rowIndex">
                        <td v-for="(cell, colIndex) in row" :key="colIndex">
                            {{ cell }}
                        </td>
                    </tr>
                </table>
            </div>

            <div class="dice">
                <h3>Dice Result</h3>
                <p>{{ diceResult }}</p>
            </div>

            <div class="matrix user-matrix">
                <h3>User's Matrix</h3>
                <table>
                    <tr v-for="(row, rowIndex) in userMatrix" :key="rowIndex">
                        <td v-for="(cell, colIndex) in row" :key="colIndex" @click="handleCellClick(rowIndex, colIndex)"
                            contenteditable="true">
                            {{ cell }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <button @click="userTurn" :disabled="gameOver">Roll Dice</button>

        <div class="score-container">
            <p>User score: {{ userScore }}</p>
            <p>Computer score: {{ computerScore }}</p>
        </div>

        <div v-if="gameOver" class="game-over-message">
            <p>{{ winnerMessage }}</p>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue';

const generateEmptyMatrix = (rows, cols) => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push('');
        }
        matrix.push(row);
    }
    return matrix;
};

const rows = 3;
const cols = 3;

const userMatrix = reactive(generateEmptyMatrix(rows, cols));
const computerMatrix = reactive(generateEmptyMatrix(rows, cols));
let diceResult = ref(0);
let userScore = ref(0);
let computerScore = ref(0);
let gameOver = ref(false);
let winnerMessage = ref('');

const calculateScore = () => {
    userScore.value = calculateMatrixScore(userMatrix);
    computerScore.value = calculateMatrixScore(computerMatrix);
};

const calculateMatrixScore = (matrix) => {
    return matrix.flat().reduce((acc, cell) => acc + (cell ? cell : 0), 0);
};

const rollDice = () => {
    diceResult.value = Math.floor(Math.random() * 6) + 1;
    calculateScore();
};

const userTurn = () => {
    if (!gameOver.value) {
        rollDice();
        //console.log(diceResult.value);
    }
};

const handleCellClick = (rowIndex, colIndex) => {
    if (!gameOver.value) {
        rollDice();
        userMatrix[rowIndex][colIndex] = diceResult.value;
        destroyOpponentDice(computerMatrix, rowIndex, colIndex);
        checkGameOver();
        computerTurn();
    }
};

const destroyOpponentDice = (matrix, rowIndex, colIndex) => {
    const valueToDestroy = diceResult.value;
    for (let i = 0; i < rows; i++) {
        if (matrix[i][colIndex] === valueToDestroy) {
            matrix[i][colIndex] = '';
        }
    }
};

const computerTurn = () => {
    if (!gameOver.value) {
        rollDice();
        let emptyCells = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!computerMatrix[i][j]) {
                    emptyCells.push([i, j]);
                }
            }
        }
        if (emptyCells.length > 0) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            computerMatrix[randomCell[0]][randomCell[1]] = diceResult.value;
            destroyOpponentDice(userMatrix, randomCell[0], randomCell[1]);
            checkGameOver();
        }
    }
};

const checkGameOver = () => {
    if (
        userMatrix.flat().every((cell) => cell !== '') ||
        computerMatrix.flat().every((cell) => cell !== '')
    ) {
        gameOver.value = true;
        determineWinner();
    }
};

const determineWinner = () => {
    if (userScore.value > computerScore.value) {
        winnerMessage.value = 'Congratulations! You win!';
    } else if (userScore.value < computerScore.value) {
        winnerMessage.value = 'Computer wins. Better luck next time!';
    } else {
        winnerMessage.value = "It's a tie!";
    }
};

</script>
  
  


<style scoped>
.game-container {
    max-width: 800px;
    margin: 20px auto;
    text-align: center;
}

.matrix-container {
    display: flex;
    flex-direction: column;
    /* Set to column for vertical layout */
    align-items: center;
    /* Optional: Center the items horizontally */
}

.matrix {
    flex: 1;
    padding: 20px;
    border: 2px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 10px;
    text-align: center;
}

.computer-matrix {
    background-color: #f5f5f5;
}

.user-matrix {
    background-color: #f5f5f5;
}

table {
    border-collapse: collapse;
    width: 100%;
}

td {
    border: 2px solid #ddd;
    padding: 16px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
}

h2,
h3 {
    color: #2196f3;
}

button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    margin-top: 20px;
}

.score-container {
    margin-top: 20px;
    font-size: 18px;
}
</style>