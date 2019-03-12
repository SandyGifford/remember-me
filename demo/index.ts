import RememberMe from "@src/RememberMe";

const memory = RememberMe.remember(document.querySelectorAll("time-ago")[2] as HTMLElement);
console.log(RememberMe.recall(memory));
