import RememberMe from "@src/RememberMe";

const el = document.querySelectorAll("time-ago")[2] as HTMLElement;

const memory = RememberMe.remember(el);

el.parentElement.removeChild(el);
(document.querySelectorAll("time-ago")[3]).after(el);

console.log(RememberMe.recall(memory));
