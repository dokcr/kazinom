function genCode() {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let r = "";
  for (let i = 0; i < 12; i++) {
    if (i === 4 || i === 8) r += "-";
    r += c[Math.floor(Math.random() * c.length)];
  }
  return r;
}

document.getElementById("generate").onclick = () => {
  const amount = Number(document.getElementById("amount").value);
  if (amount <= 0) return alert("Məbləğ səhvdir");

  const code = genCode();
  localStorage.setItem("code_" + code, amount);

  document.getElementById("result").innerHTML =
    ✅ Kod: <b>${code}</b><br>${amount} AZN;
};
