let balance = 0;
const symbols = ["🍒","🍋","💎","7️⃣","🔔"];

const betSelect = document.getElementById("bet");

function updateBetOptions() {
  betSelect.innerHTML = "";
  for (let b = 0.2; b <= balance; b += 0.2) {
    betSelect.innerHTML += <option value="${b.toFixed(2)}">${b.toFixed(2)} AZN</option>;
  }
}

function updateBalance() {
  document.getElementById("balance").innerText = balance.toFixed(2);
  updateBetOptions();
}

function loadBalance() {
  const code = document.getElementById("codeInput").value.trim();
  const val = localStorage.getItem("code_" + code);

  if (!val) return alert("Kod tapılmadı");

  balance += Number(val);
  localStorage.removeItem("code_" + code);
  document.getElementById("codeInput").value = "";
  updateBalance();
}

function spin() {
  if (balance <= 0) {
    document.getElementById("msg").innerText =
      "Balans bitdi – yeni kod daxil et";
    return;
  }

  const bet = Number(betSelect.value);
  if (bet > balance) return;

  balance -= bet;
  updateBalance();

  document.getElementById("spinSound").play();

  const reels = document.querySelectorAll(".symbol");
  reels.forEach(r => r.classList.add("spin"));

  setTimeout(() => {
    const res = [];
    reels.forEach(r => {
      const s = symbols[Math.floor(Math.random()*symbols.length)];
      r.innerText = s;
      r.classList.remove("spin");
      res.push(s);
    });

    if (res[0] === res[1] && res[1] === res[2]) {
      const win = bet * 5;
      balance += win;
      document.getElementById("winSound").play();
      document.getElementById("msg").innerText =
        🎉 UDUŞ: +${win.toFixed(2)} AZN;
    } else {
      document.getElementById("msg").innerText = "Uduş yoxdur";
    }

    updateBalance();
  }, 1200);
}
