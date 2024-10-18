const parentBgEl = document.querySelector(".bg");
const childEls = document.querySelectorAll(".backcontainer .text span");
const textEl = document.querySelector(".text");

childEls.forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    const id = el.getAttribute("data-text");
    const bgEl = parentBgEl.querySelector(`.id-${id}`);
 parentBgEl.querySelectorAll("img").forEach((img) => {
      img.style.display = "none";
      img.style.animation = "";
    });
    bgEl.style.display = "block";
    bgEl.style.animation = "anima 0.3s ease forwards";

    // line animation
    const cords = el.getBoundingClientRect();
    const textCords = textEl.getBoundingClientRect();

  });
});

