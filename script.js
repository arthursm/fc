// ELEMENTOS
const startBtn = document.getElementById('startBtn');
const quizSection = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const resultSection = document.getElementById('result');
const percentEl = document.getElementById('percent');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

// PERGUNTAS
const questions = [
  {
    question: "Com que frequência você come carne vermelha? 1 porção= 70g (o equivalente a duas fatias de presunto",
    options: [
      { text: "Sempre (duas ou mais porções por dia no almoço, no lanche da tarde e no jantar)", value: 10 },
      { text: "Frequentemente (uma porção por dia no almoço e outra no lanche da tarde ou jantar)", value: 20 },
      { text: "Ocasionalmente (uma porção por dia)", value: 40 },
      { text: "Com pouca frequência (três porções por semana)", value: 70 },
      { text: "Nunca", value: 100 }
    ]
  },
  {
    question: "Com que frequência você come peixe ou frutos do mar (camarões, caranguejos, ostras e mexilhões)?",
    options: [
      { text: "Nunca", value: 100 },
      { text: "Raramente (uma vez por semana ou menos)", value: 40 },
      { text: "Ocasionalmente (duas vezes por semana)", value: 30 },
      { text: "Frequentemente (uma vez por dia)", value: 20 },
      { text: "Sempre (em todas as refeições)", value: 10 }
    ]
  },
  {
    question: "Você utiliza aparelhos de ar condicionado ou aquecedores em sua casa?",
    options: [
      { text: "Possuo mais do que 3 ar condicionados", value: 10 },
      { text: "Possuo de 2 a 3 ar condicionados", value: 25 },
      { text: "Utilizo ar condicionado", value: 50 },
      { text: "Apenas ventiladores", value: 75 },
      { text: "Não tenho", value: 100 }
    ]
  },
  {
    question: "Qual a procedência alimentos que você consome?",
    options: [
      { text: "Apenas em supermercados", value: 10 },
      { text: "Normalmente em supermercados e poucas vezes em feiras e quitandas", value: 25 },
      { text: "Equilibrado, as vezes no supermercado outras em feiras", value: 40 },
      { text: "A maior parte de feiras, quitandas. Poucas vezes compro em supermercados ou hipermercados", value: 70 },
      { text: "De minha própria horta e pomar ou de lojas de produtos orgânicos ou feiras e quitandas", value: 100 }
    ]
  },
  {
    question: "Quantas vezes por ano você compra sapatos e roupas novas?",
    options: [
      { text: "Uma vez por ano", value: 10 },
      { text: "Duas vezes por ano", value: 30 },
      { text: "Três vezes por ano", value: 50 },
      { text: "Todo mês", value: 70 },
      { text: "Todo fim de semana", value: 100 }
    ]
  },
  {
    question: "Com que frequência você ou sua família compra eletrodomésticos e equipamentos eletrônicos (televisores, computadores, aparelhos celulares etc)? ",
    options: [
      { text: "Mal troco/trocamos", value: 10 },
      { text: "Quando dá problema ou quebra", value: 25 },
      { text: "Quando já está  muito usado e ultrapassado", value: 50 },
      { text: "Ocasionalmente quando apenas quero/queremos o atual", value: 75 },
      { text: "Sempre quando aparece melhores opções", value: 100 }
    ]
  },
  {
    question: "Quantas torneiras ficam abertas enquanto escova os dentes?",
    options: [
      { text: "Fecho totalmente", value: 10 },
      { text: "Abro um pouco", value: 40 },
      { text: "Deixo meio abertas", value: 70 },
      { text: "Sempre abertas", value: 100 },
      { text: "Não escovo os dentes", value: 0 }
    ]
  },
  {
    question: "Você usa máquina de lavar ou lava à mão?",
    options: [
      { text: "Máquina cheia", value: 10 },
      { text: "Máquina meia carga", value: 30 },
      { text: "À mão com cuidado", value: 50 },
      { text: "À mão desperdiçando", value: 80 },
      { text: "Lavo várias vezes à mão", value: 100 }
    ]
  },
  {
    question: "Você toma banhos longos diariamente?",
    options: [
      { text: "Não, banhos curtos", value: 10 },
      { text: "Às vezes longos", value: 40 },
      { text: "Frequentemente longos", value: 70 },
      { text: "Quase sempre longos", value: 90 },
      { text: "Sempre longos", value: 100 }
    ]
  },
  {
    question: "Você utiliza água da chuva ou outras fontes alternativas?",
    options: [
      { text: "Sim, sempre que possível", value: 10 },
      { text: "Às vezes", value: 40 },
      { text: "Raramente", value: 70 },
      { text: "Nunca", value: 100 },
      { text: "Não sei", value: 80 }
    ]
  }
];

let currentQuestion = 0;
let score = 0;

// INICIAR QUIZ
startBtn.addEventListener('click', () => {
  document.getElementById('about').classList.add('hidden');
  quizSection.classList.remove('hidden');
  showQuestion();
});

// MOSTRAR PERGUNTA
function showQuestion() {
  const q = questions[currentQuestion];
  questionContainer.innerHTML = `
    <h2>${q.question}</h2>
    <div class="options">
      ${q.options.map((opt, i) => `<button class="option-btn" data-value="${opt.value}">${opt.text}</button>`).join('')}
    </div>
  `;
  updateProgress();

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      score += parseInt(btn.dataset.value);
      currentQuestion++;
      if(currentQuestion < questions.length){
        showQuestion();
      } else {
        showResult();
      }
    });
  });
}

// ATUALIZAR PROGRESSO
function updateProgress() {
  const percent = Math.round((currentQuestion / questions.length) * 100);
  progressBar.style.width = percent + '%';
  progressText.textContent = percent + '%';
}

// MOSTRAR RESULTADO
function showResult() {
  quizSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  const average = Math.round(score / questions.length);
  percentEl.textContent = average + '%';

  if(average <= 30){
    messageEl.textContent = "Excelente! Você é muito consciente com o uso da água.";
  } else if(average <= 60){
    messageEl.textContent = "Bom! Mas ainda dá para melhorar seu consumo de água.";
  } else {
    messageEl.textContent = "Atenção! Você precisa reduzir o consumo de água urgentemente.";
  }
}

// REINICIAR QUIZ
restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  resultSection.classList.add('hidden');
  document.getElementById('about').classList.remove('hidden');
  progressBar.style.width = '0%';
  progressText.textContent = '0%';
});
