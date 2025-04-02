const select = document.getElementsByClassName('col');
const currentPlayerDisplay = document.getElementById('current-player');
const resetBtn = document.getElementById('reset-btn');

for (let i = 0; i < select.length; i++) {
    select[i].addEventListener('click', function() {
        handleClick(this);
    });
}

resetBtn.addEventListener('click', resetGame);

let currPlayer = "X";
let arr = Array(9).fill(null);

function checkWinner(){
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
            select[a].classList.add('winner');
            select[b].classList.add('winner');
            select[c].classList.add('winner');
            
            setTimeout(() => {
                showModal(`Player ${currPlayer} wins!`);
            }, 500);
            return true;
        }
    }

    if(!arr.some(e => e === null)){
        setTimeout(() => {
            showModal("It's a draw!");
        }, 500);
        return true;
    }
    return false;
}

function handleClick(el){
    const id = Number(el.id);
    if(arr[id] !== null || checkWinner()) return;
    
    arr[id] = currPlayer;
    el.innerText = currPlayer;
    el.classList.add(currPlayer.toLowerCase());
    
    if (!checkWinner()) {
        currPlayer = currPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currPlayer;
        currentPlayerDisplay.style.color = currPlayer === 'X' ? 'var(--x-color)' : 'var(--o-color)';
    }
}

function resetGame() {
    for (let i = 0; i < select.length; i++) {
        select[i].innerText = '';
        select[i].classList.remove('x', 'o', 'winner');
        arr[i] = null;
    }
    currPlayer = 'X';
    currentPlayerDisplay.textContent = currPlayer;
    currentPlayerDisplay.style.color = 'var(--x-color)';
}

function showModal(message) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '2rem';
    modalContent.style.borderRadius = '15px';
    modalContent.style.textAlign = 'center';
    modalContent.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    
    const modalText = document.createElement('h2');
    modalText.textContent = message;
    modalText.style.color = 'var(--primary)';
    modalText.style.marginBottom = '1.5rem';
    
    const modalButton = document.createElement('button');
    modalButton.textContent = 'Play Again';
    modalButton.style.padding = '10px 25px';
    modalButton.style.background = 'var(--primary)';
    modalButton.style.color = 'white';
    modalButton.style.border = 'none';
    modalButton.style.borderRadius = '50px';
    modalButton.style.cursor = 'pointer';
    modalButton.style.fontWeight = '600';
    modalButton.style.transition = 'all 0.3s ease';
    
    modalButton.onmouseover = () => {
        modalButton.style.background = 'var(--secondary)';
        modalButton.style.transform = 'translateY(-2px)';
    };
    
    modalButton.onmouseout = () => {
        modalButton.style.background = 'var(--primary)';
        modalButton.style.transform = 'translateY(0)';
    };
    
    modalButton.onclick = () => {
        document.body.removeChild(modal);
        resetGame();
    };
    
    modalContent.appendChild(modalText);
    modalContent.appendChild(modalButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}