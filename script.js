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

// PERGUNTAS — VALORES REFIZERAM DO ZERO (0 = bom, 100 = ruim)
const questions = [
  {
    question: "Com que frequência você come carne vermelha?",
    options: [
      { text: "Nunca", value: 0 },
      { text: "Com pouca frequência (3 porções por semana)", value: 25 },
      { text: "Ocasionalmente (1 porção por dia)", value: 50 },
      { text: "Frequentemente (1–2 porções por dia)", value: 75 },
      { text: "Sempre (2+ porções por dia)", value: 100 }
    ]
  },
  {
    question: "Com que frequência você come peixe ou frutos do mar?",
    options: [
      { text: "Nunca", value: 0 },
      { text: "Raramente (1x por semana)", value: 25 },
      { text: "Ocasionalmente (2x por semana)", value: 50 },
      { text: "Frequentemente (1x por dia)", value: 75 },
      { text: "Sempre (todas as refeições)", value: 100 }
    ]
  },
  {
    question: "Você utiliza ar condicionado ou aquecedor?",
    options: [
      { text: "Não tenho", value: 0 },
      { text: "Apenas ventiladores", value: 25 },
      { text: "Uso ar condicionado às vezes", value: 50 },
      { text: "Possuo 2–3 ar condicionados", value: 75 },
      { text: "Possuo mais que 3 ar condicionados", value: 100 }
    ]
  },
  {
    question: "Procedência dos alimentos que você consome:",
    options: [
      { text: "Da minha horta / orgânicos", value: 0 },
      { text: "Maioria em feiras e quitandas", value: 25 },
      { text: "Equilibrado entre feira e mercado", value: 50 },
      { text: "Quase sempre supermercado", value: 75 },
      { text: "Somente supermercado", value: 100 }
    ]
  },
  {
    question: "Quantas vezes por ano compra roupas/sapatos novos?",
    options: [
      { text: "1 vez por ano", value: 0 },
      { text: "2 vezes por ano", value: 25 },
      { text: "3 vezes por ano", value: 50 },
      { text: "Todo mês", value: 75 },
      { text: "Todo fim de semana", value: 100 }
    ]
  },
  {
    question: "Com que frequência compra eletrônicos?",
    options: [
      { text: "Só quando quebra", value: 0 },
      { text: "Quando está bem usado", value: 25 },
      { text: "Troco ocasionalmente", value: 50 },
      { text: "Troco por vontade", value: 75 },
      { text: "Troco sempre que aparece modelo novo", value: 100 }
    ]
  },
  {
    question: "Quantas torneiras ficam abertas ao escovar os dentes?",
    options: [
      { text: "Fecho totalmente", value: 0 },
      { text: "Abro um pouco", value: 25 },
      { text: "Meio aberta", value: 50 },
      { text: "Sempre aberta", value: 100 },
      { text: "Não escovo os dentes", value: 75 }
    ]
  },
  {
    question: "Você usa máquina de lavar ou lava à mão?",
    options: [
      { text: "Máquina cheia", value: 0 },
      { text: "Máquina meia carga", value: 25 },
      { text: "À mão com cuidado", value: 50 },
      { text: "À mão desperdiçando", value: 75 },
      { text: "Lavo várias vezes", value: 100 }
    ]
  },
  {
    question: "Você toma banhos longos diariamente?",
    options: [
      { text: "Banhos curtos", value: 0 },
      { text: "Às vezes longos", value: 25 },
      { text: "Frequentemente longos", value: 50 },
      { text: "Quase sempre longos", value: 75 },
      { text: "Sempre longos", value: 100 }
    ]
  },
  {
    question: "Você usa água da chuva ou fontes alternativas?",
    options: [
      { text: "Sim, sempre", value: 0 },
      { text: "Às vezes", value: 25 },
      { text: "Raramente", value: 50 },
      { text: "Nunca", value: 100 },
      { text: "Não sei", value: 75 }
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
      ${q.options.map(opt => `
        <button class="option-btn" data-value="${opt.value}">
          ${opt.text}
        </button>`
      ).join('')}
    </div>
  `;
  updateProgress();

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      score += Number(btn.dataset.value);
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
  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "%";
}

// MOSTRAR RESULTADO
function showResult() {
  quizSection.classList.add('hidden');
  resultSection.classList.remove('hidden');

  const maxPossible = questions.length * 100;
  const finalPercent = Math.round((score / maxPossible) * 100);

  percentEl.textContent = finalPercent + "%";

  if(finalPercent <= 30){
    messageEl.textContent = "Excelente! Sua pegada ecológica é baixa.";
  } else if(finalPercent <= 60){
    messageEl.textContent = "Boa! Dá pra melhorar um pouco.";
  } else if(finalPercent <= 80){
    messageEl.textContent = "Atenção! Seu impacto ambiental está alto.";
  } else {
    messageEl.textContent = "Crítico! Sua pegada ecológica é muito alta.";
  }
}

// REINICIAR
restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  resultSection.classList.add('hidden');
  document.getElementById('about').classList.remove('hidden');
  progressBar.style.width = "0%";
  progressText.textContent = "0%";
});
