let a = {
  x: 1,
};
if (a?.x) {
  console.log('a?x', a.x);
}

console.log(a?.y);

let x = 11;

console.log(y ?? 22);

async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  debugger; // 设置断点
  const data = await response.json();
  console.log(data);
}

fetchData();
