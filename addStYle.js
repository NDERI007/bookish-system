const bodyclass = "w-screen h-screen flex justify-center items-center bg-slate-400 bg-gradient-to-t from-stone-50 bg-opacity-25";
const bdy = document.querySelector("body");

bodyclass.split(" ").forEach((cls) => bdy.classList.add(cls));