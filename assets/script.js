const form = document.getElementById("form");

const displayNumbers = document.getElementById("displayNumbers");
const totalNumbersEl = document.getElementById("totalNumbers");
const largestValueEl = document.getElementById("largestValue");
const smallestValueEl = document.getElementById("smallestValue");
const LV = document.getElementById("LV");
const SV = document.getElementById("SV");
const rangeEl = document.getElementById("range");
const topRanges = document.getElementsByClassName("top-range");
const N = document.getElementById("N");
const logValue = document.getElementById("logValue");
const logAdd = document.getElementById("logAdd");
const logAddBy1 = document.getElementById("logAddBy1");
const logResult = document.getElementById("logResult");
const CI = document.getElementsByClassName("CI");
const R = document.getElementById("R");
const CIResult = document.getElementById("CIResult");
const classNumberEl = document.getElementById("classNumber");
const incrementClassNumber = document.getElementById("incrementClassNumber");

const closeBtn = document.getElementById("closeBtn");
const displaySolution = document.getElementById("displaySolution");
const processing = document.querySelector(".processing");

// Variables Declarations
let minValue;
let maxValue;
let range;
let classInterval;
let classNumber;
let ciResult;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const numbers = event.target["number"].value;
  const method = event.target["method"].value;

  // Remove spaces after comma (,)
  const removeSpaces = numbers.trim().split(" ").join("");
  const numbersArr = removeSpaces
    .split(",")
    .filter((num) => !isNaN(parseInt(num)))
    .map((n) => parseInt(n));

  // মোট উপাত্তের সংখ্যা (N)
  const totalNumbers = numbersArr.length;

  // সর্বোচ্চ মান (L)
  maxValue = Math.max(...numbersArr);

  if (maxValue > 10_000) {
    alert(
      `আপনান একটি মান ১০,০০০ হাজার এর উপরে আছে।\n প্রতিটি মান অবশ্যই ১০,০০০ এর মধ্যে হতে হবে।`
    );
    return;
  }

  // সর্বনিম্ন মান (S)
  minValue = Math.min(...numbersArr);

  // পরিসর (R)
  range = maxValue - minValue;

  // শ্রেণি ব্যবধান (C.I)
  classInterval = findClassInterval(totalNumbers, range);

  // শ্রেণি সংখ্যা
  classNumber = Math.ceil(range / classInterval);
  if (maxValue % 5 === 0) classNumber += 1;

  // Display
  displayNumbers.innerText = numbersArr.join(", ");
  totalNumbersEl.innerText = totalNumbers;
  largestValueEl.innerText = maxValue;
  smallestValueEl.innerText = minValue;
  LV.innerText = maxValue;
  SV.innerText = minValue;
  rangeEl.innerText = maxValue - minValue;
  [...topRanges].forEach((r) => (r.innerText = range));
  N.innerText = totalNumbers;

  const log = Number(Math.log10(totalNumbers).toFixed(2));
  logValue.innerText = log;
  logAdd.innerText = (3.322 * log).toFixed(2);

  const strugesFormula = Number((1 + 3.322 * log).toFixed(2));
  logAddBy1.innerText = strugesFormula;
  const ci = Number((range / strugesFormula).toFixed(2));
  logResult.innerText = ci;
  [...CI].forEach((ci) => (ci.innerText = classInterval));
  R.innerText = range;

  ciResult = Number.isInteger(range / classInterval)
    ? range / classInterval
    : (range / classInterval).toFixed(1);
  CIResult.innerText = ciResult;

  classNumberEl.innerText =
    maxValue % 5 === 0 ? `(${Math.ceil(ciResult)} + 1)` : Math.ceil(ciResult);

  if (maxValue % 5 === 0) {
    incrementClassNumber.innerText = `= ${classNumber}`;
  } else {
    incrementClassNumber.innerText = "";
  }

  // Table
  displayTable(numbersArr, method);

  processing.style.display = "block";

  setTimeout(() => {
    processing.style.display = "none";
    displaySolution.style.display = "block";
  }, 2000);
});

closeBtn.addEventListener("click", function (e) {
  displaySolution.style.display = "none";
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

function displayTable(numbersArr, method) {
  const tBody = document.querySelector("tBody");
  const selectedMethod = document.getElementsByClassName("selectedMethod");

  let minValueStr = minValue.toString();
  if (!(minValueStr.endsWith("0") || minValueStr.endsWith("5"))) {
    while (!(minValue % 5 === 0)) {
      minValue--;
    }
  }

  let num = minValue;

  tBody.innerHTML = "";
  let totalSum = 0;

  if (method === "included") {
    [...selectedMethod].forEach((el) => (el.innerText = "অন্তর্ভূক্ত"));

    while (num <= maxValue) {
      const total = numbersArr.filter(
        (n) => n >= num && n <= num + (classInterval - 1)
      ).length;
      totalSum += total;
      const temp = `<tr>
        <td>${num} - ${num + (classInterval - 1)}</td>
        <td>${"|".repeat(total)}</td>
        <td>${total}</td>
      </tr>`;

      tBody.innerHTML += temp;
      num += classInterval;
    }
    console.log(tBody.children.length, classNumber);
    if (tBody.children.length > classNumber) {
      classNumberEl.innerText = `(${Math.ceil(ciResult)} + ${
        tBody.children.length - Math.ceil(ciResult)
      })`;
      incrementClassNumber.innerText = `= ${tBody.children.length}`;
    }
  } else {
    Array(classNumber || 0)
      .fill(0)
      .forEach((_, i) => {
        const total = numbersArr.filter(
          (n) => n >= num && n < num + classInterval
        ).length;
        totalSum += total;
        const temp = `<tr>
          <td>${num} - ${(num += classInterval)}</td>
          <td>${"|".repeat(total)}</td>
          <td>${total}</td>
        </tr>`;

        tBody.innerHTML += temp;
      });
  }

  document.getElementById("totalSumResult").innerText = totalSum;
}
