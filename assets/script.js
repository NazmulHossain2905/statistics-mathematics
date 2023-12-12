const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const numbers = event.target["numbers"].value;

  // Remove spaces after comma (,)
  const removeSpaces = numbers.trim().split(" ").join("");
  const numbersArr = removeSpaces.split(",").map((num) => parseInt(num));

  // মোট উপাত্তের সংখ্যা (N)
  const totalNumbers = numbersArr.length;

  // সর্বোচ্চ মান (L)
  const maxValue = Math.max(...numbersArr);

  // সর্বনিম্ন মান (S)
  const minValue = Math.min(...numbersArr);

  // পরিসর (R)
  const range = maxValue - minValue;

  // শ্রেণি ব্যবধান (C.I)
  const classInterval = findClassInterval(totalNumbers, range);
  console.log({ classInterval });

  // শ্রেণি সংখ্যা
  let classNumber = Math.ceil(range / classInterval);
  if (maxValue % 5 === 0) classNumber += 1;

  console.log({ classNumber });
});

function findClassInterval(totalNumbers, range) {
  const log = Number(Math.log10(totalNumbers).toFixed(2));

  const strugesFormula = Number((1 + 3.322 * log).toFixed(2));

  const ci = Number((range / strugesFormula).toFixed(2));

  switch (true) {
    case ci <= 7.5:
      return 5;
    case ci <= 12.5:
      return 10;
    case ci <= 17.5:
      return 15;
    case ci <= 22.5:
      return 20;
    case ci <= 27.5:
      return 25;
    case ci <= 32.5:
      return 30;
    case ci <= 37.5:
      return 35;
    case ci <= 42.5:
      return 40;
    case ci <= 47.5:
      return 45;
    default:
      return 50;
  }
}
