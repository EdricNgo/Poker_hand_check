var rankCards;
var TripleCards, DoubleCards, QuadrupleCards;
var typingTimer;
var doneTypingInterval = 500;

$('#En').keyup(function () {
    clearTimeout(typingTimer);
    if ($('#En').val()) {
        typingTimer = setTimeout(handlePoker, doneTypingInterval);
    }
});


/**
 * Count the number of triple cards, double cards and Quadruple cards.
 * @param {array} rankCards
 * Change the values of global variables: TripleCards, DoubleCards, QuadrupleCards
 */
function countCards(rankCards) {
    TripleCards = 0;
    DoubleCards = 0;
    QuadrupleCards = 0;
    error = false;
    var temp = rankCards[0]
    var count = 1;
    for (var i = 1; i < 5; i++) {
        if (rankCards[i] == temp) {
            count++;
        }
        if (rankCards[i] != temp || i == 4) {
            switch (count) {
                case 2:
                    DoubleCards++;
                    break;
                case 3:
                    TripleCards++;
                    break;
                case 4:
                    QuadrupleCards++;
                    break;
                case 5:
                    error = true;
                    break;
            }
            ;
            temp = rankCards[i];
            count = 1;
        }
    }
}

/**
 * Sort an array with Selection sort method
 * @param {array} rankCards
 *
 */
function sortArray(arr, n) {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < i; j++) {
            if (arr[i] < arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

/**
 * Validate the poker string.
 * @param {string} Poker
 * @returns {string}
 */
function validatePoker(Poker) {
    var Pattern = /((C|H|D|S)(10|[2-9]|(J|Q|K|A))){5}$/i;
    var Cards = new Array;
    if (!Pattern.test(Poker)) return "Poker không hợp lệ!";
    var countTen =0;
    for (var i = 0; i < 5; i++) {
        if (Poker.substring(i * 2 + 1 + countTen, i * 2 + 2 + countTen) == "1") {
            Cards.push(Poker.substring(i * 2  + countTen, i * 2 + 3 + countTen));
            countTen++;
        }
        else {
            Cards.push(Poker.substring(i * 2 + countTen, i * 2 + 2 + countTen));
            console.log(i * 2 + 1 + countTen);
        }
    }
    for(var i = 0; i<5;i++)
    {
        for (var j=i+1;j<5;j++)
        {
        if(Cards[i]==Cards[j]) return "Có cặp lá Poker bị lặp lại!"
        }
    }
}

/**
 * Check the poker hand and return
 * @param Poker
 * @returns {string}
 */
function checkPoker(Poker) {
    rankCards = new Array();
    var countTen = 0;
    for (var i = 0; i < 5; i++) {
        if (Poker.substring(i * 2 + 1 + countTen, i * 2 + 2 + countTen) == "1") {
            rankCards.push(Poker.substring(i * 2 + 1 + countTen, i * 2 + 3 + countTen));
            countTen++;
        }
        else {
            rankCards.push(Poker.substring(i * 2 + 1 + countTen, i * 2 + 2 + countTen));
            console.log(i * 2 + 1 + countTen);
        }
    }
    sortArray(rankCards, 5);
    console.log(rankCards);
    countCards(rankCards);
    if (QuadrupleCards == 1) return "4C";
    if (DoubleCards == 1 && TripleCards == 1) return "FH";
    if (TripleCards == 1) return "3C";
    if (DoubleCards == 2) return "2P";
    if (DoubleCards == 1) return "1P";
    return "--";
}

function handlePoker() {
    var Poker = $('#En').val();
    var Error = validatePoker(Poker);
    if (Error) {
        $('#Vi').val(Error);
        return;
    }
    $('#Vi').val(checkPoker(Poker));
}

