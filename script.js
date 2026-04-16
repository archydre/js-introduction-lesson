const sendBtn = document.getElementById("send");
const input = document.getElementById("word-input");
const list = document.getElementById("lista");

const words = JSON.parse(localStorage.getItem("words")) || [];

const renderItems = () => {
  list.innerHTML = "";
  words.forEach((item, index) => {
    const toInsert = `<li data-index="${index}">${item} - <button class="delete-btn">🗑️</button></li>`;
    list.insertAdjacentHTML("beforeend", toInsert);
  });
};

renderItems();

list.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  if (!deleteBtn) {
    return;
  }

  const li = deleteBtn.closest("li");
  const index = parseInt(li.dataset.index);

  words.splice(index, 1);
  li.remove();
  console.log("words:", words);
});

sendBtn.addEventListener("click", async (e) => {
  words.push(input.value);
  input.value = "";
  console.log("array words: ", words);
  renderItems();
  localStorage.setItem("words", JSON.stringify(words));
});

input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    sendBtn.click();
  }
});
