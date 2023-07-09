class Player {
    constructor(firstName, lastName, country, score)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
        this.score = score;
    }

    addFive()
    {
        const currentScore = parseInt(this.score);
        const newScore = currentScore + 5;
        this.score = newScore;
    }

    subtractFive()
    {
        const currentScore = parseInt(this.score);
        const newScore = currentScore - 5;
        this.score = newScore;
    }

    getFullName() {
        return this.firstName +' '+ this.lastName;
    }

    remove() {
        this.remove();
    }

}


const button = document.querySelector('#button');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const country = document.querySelector('#country');
const score = document.querySelector('#score');
const alert = document.querySelector('.alert');
const playersSection = document.querySelector('.players');
const players = [];

button.addEventListener('click',() => {
    if(firstName.value === '' || lastName.value === '' || country.value === '' || score.value === '') alert.innerHTML = 'All fields are required';
    else {
        alert.innerHTML = '';
        const player = new Player(firstName.value,lastName.value,country.value,score.value);
        if(players.length === 0) 
        {
            players.push(player);
            playersSection.appendChild(creatingDiv(player));
        }
        else {
            addingFunction(player);
        }
    }
});

const creatingDiv = (player) => {
    const person = document.createElement('div');
    person.className = 'player';
    const name = document.createElement('p');
    name.className = 'name';
    person.appendChild(name);
    name.innerHTML = player.getFullName().toUpperCase();
    const personalCountry = document.createElement('p');
    personalCountry.className = 'country';
    personalCountry.innerHTML = player.country.toUpperCase();
    person.appendChild(personalCountry);
    const personalScore = document.createElement('p');
    personalScore.className = 'score';
    personalScore.innerHTML = player.score;
    person.appendChild(personalScore);

    const utilities = document.createElement('div');
    utilities.className = 'utilities';
    const trash = document.createElement('button');
    trash.className = 'trash';
    const icon = document.createElement('i');
    icon.className = 'fa fa-trash';
    trash.appendChild(icon);
    trash.addEventListener('click',() => {
        const index = players.indexOf(player);
        players.splice(index,1);
        playersSection.innerHTML = '';
        players.forEach(player => {
            playersSection.appendChild(creatingDiv(player));
        })
    });
    utilities.appendChild(trash);
    const addFive = document.createElement('button');
    addFive.type = 'submit';
    addFive.className = 'add';
    addFive.innerHTML = '+5';
    addFive.addEventListener('click', () => {
        player.addFive();
        personalScore.innerHTML = player.score;
        players.sort((a,b) => {
            if(a.score < b.score) return 1;
            else if(a.score > b.score) return -1;
            else return 0;
        });
        playersSection.innerHTML = '';
        players.forEach(player => {
            playersSection.appendChild(creatingDiv(player));
        })
      });
    utilities.appendChild(addFive);
    const subtractFive = document.createElement('button');
    subtractFive.type = 'submit';
    subtractFive.className = 'subtract';
    subtractFive.innerHTML = '-5';
    subtractFive.addEventListener('click', () => {
        player.subtractFive();
        personalScore.innerHTML = player.score;
        players.sort((a,b) => {
            if(a.score < b.score) return 1;
            else if(a.score > b.score) return -1;
            else return 0;
        });
        playersSection.innerHTML = '';
        players.forEach(player => {
            playersSection.appendChild(creatingDiv(player));
        })
      });
    utilities.appendChild(subtractFive);
    person.appendChild(utilities);

    return person;
};

const addingFunction = (player) => {
    for(let i = 0; i < players.length; i++)
    {
        if(players[i].score <= player.score) {
            players.splice(i,0,player);
            playersSection.insertBefore(creatingDiv(player),playersSection.querySelector(`.player:nth-child(${i+1})`));
            return;
        };
    }
    players.push(player);
    playersSection.appendChild(creatingDiv(player));
};
