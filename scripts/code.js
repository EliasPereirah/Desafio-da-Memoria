let btn = document.querySelector('button');
btn.onclick = ()=>{
    init()
};
chances = 5;
usedChances = 0;
let totWords = 5;
let repeatMultiplier = 3;
let repeat = totWords * repeatMultiplier;
function init() {
        words = getWords(totWords);
        let app = document.querySelector(".app");
            app.innerHTML = '<h2>Que comece o desafio!</h2><p> Você tem <span id="timer">'+repeat+'</span> segundos para memorizar essas palavraas</p>';
            let list = '';
            words.forEach(word=>{
                list +='<li>'+word+'</li>';
            });
            list ='<ol>'+list+'</ol>';
            app.innerHTML +=list;
            let timer = app.querySelector("#timer");
            let cronos = setInterval(()=>{
                repeat--;
                timer.innerText = parseInt(timer.textContent)-1;
                if(repeat ==0){
                    clearInterval(cronos);
                    challenge(words,app);
                }
            },1000);

        

}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function challenge(words,app){
    app.innerHTML = '<h2>Agora vamos ver se você memorizou mesmo!</h2><p>Clique nas palavras que estava presente na lista</p>';
    let new_words = getWords(5);
    new_words.push(...words);
    new_words = shuffleArray(new_words);
    let list = '';
    new_words.forEach(wd=>{
        list +='<li>'+wd+'</li>';
    });
    list ='<ol>'+list+'</ol>';
    app.innerHTML +=list;
    let score = document.createElement('div');
    score.id = 'score';
    score.innerHTML = '<p>confira sua pontuação.</p> <span data-hits="0" class="hits">Acertos: 0</span>';
    score.innerHTML +='<span data-slip="0" class="slip">Erros: 0</span>';
    app.append(score);
    analyzeAnswers(words);

}

function analyzeAnswers(valids){

  let lis = document.querySelectorAll('li');
  lis.forEach(li=>{
      li.onclick = (e)=>{
        usedChances++;
        let clickedOn = e['path'][0]['innerHTML'];
          if(usedChances != chances){
            console.log(clickedOn);
            if(valids.indexOf(clickedOn) != -1){
                toScore('+');
               
            }else{
                toScore('-');
            }
            li.remove();
          }else{
            if(valids.indexOf(clickedOn) != -1){
                toScore('+');
               
            }else{
                toScore('-');
            }
              finishChallenge()
          }
          
        
      }
  })
}


function getScore(){
    let hits  = document.querySelector(".hits")
    let slip  = document.querySelector(".slip") 
    let score = [];
    score['hits'] = parseInt(hits.getAttribute('data-hits'));
    score['slip'] = parseInt(slip.getAttribute('data-slip'));
    return score;

}

function toScore(signal){
    let hits  = document.querySelector(".hits")
    let slip  = document.querySelector(".slip")

    if(signal =='+'){
          let plus = parseInt(hits.getAttribute('data-hits')) +1;
          hits.innerHTML = "Acertos: "+plus;
          hits.setAttribute('data-hits', plus)
    }else{
        let plus = parseInt(slip.getAttribute('data-slip')) +1;
        slip.innerHTML = "Erros: "+plus;
        slip.setAttribute('data-slip', plus)
    }
}

function getWords(total){
    let words = [];
    for(i=0; i < total; i++){
     words.push(dictionary[Math.ceil(Math.random() * dictionary.length-2)]);
    };
    return words;
}

function finishChallenge(){
    usedChances = 0;
    repeat = totWords * repeatMultiplier;
    let app = document.querySelector(".app");
    let msg = '<h2>Parabéns</h2>';
    let score = getScore();
    if(score.hits < score.slip){
        msg += '<p>Você não foi bem, mas tenho certeza que vai melhorar na próxima!</p>';
    }else{
        msg += '<p>Que legal. Você acertou '+score.hits+' e errou '+score.slip+', continue... Você vai longe desse jeito</p>';
    }
    msg +='<button>Ir de novo!</button>'
    app.innerHTML = msg;
    let btn = document.querySelector('button');
    btn.onclick = ()=>{
    init()
   };
   
}