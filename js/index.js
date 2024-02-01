// 全域變數

const amountEl = document.querySelector("#amount");
const yearsEl = document.querySelector("#years");
const rateEl = document.querySelector("#rate");
const feeEl = document.querySelector("#fee");
const payment1El = document.querySelector("#payment1");
const payment2El = document.querySelector("#payment2");
const calcEl = document.querySelector("#calc");
const resetEl = document.querySelector("#reset");
const resultEl = document.querySelector("#result");
const tableallEl = document.querySelector("#table");
const tableEl = document.querySelector("#table tbody");
const example1El = document.querySelector("#example1");
const example2El = document.querySelector("#example2");

console.log(example1El, example2El, tableEl, calcEl, amountEl, yearsEl, rateEl, payment1El, payment2El, feeEl);

// 監聽動作，此處監聽滑鼠click
calcEl.addEventListener("click", calcLoan);
resetEl.addEventListener("click", resetLoan);
payment1El.addEventListener("click", showExample);
payment2El.addEventListener("click", showExample);



function calcLoan() {
    let amount = amountEl.value * 10000;
    let years = yearsEl.value;
    let rate = rateEl.value;
    // let fee = 0;
    // if (feeEl.checked) {
    //     fee = 5000;
    // }
    // 判斷式寫前面，?後面放真，:後放假
    let fee = feeEl.checked ? 5000 : 0;
    // 取得不同計算方法
    let rule = payment1El.checked ? 1 : 2;

    let result;
    let totalInterest;
    let totalAmount;
    if (rule == 1) {
        result = rule1(amount, years, rate);
        console.log(result);
        totalInterest = result[1];
        totalAmount = amount + totalInterest + fee;

    } else {
        result = rule2(amount, years, rate);
        console.log(result);
        totalInterest = result[1];
        totalAmount = result[2] + fee;
    }

    console.log(amount, years, rate, fee, rule, totalInterest, totalAmount);

    document.querySelector(".totalAmount").innerText = totalAmount + "元" + (fee == 0 ? "" : "(含手續費)");
    document.querySelector(".totalInterest").innerText = totalInterest + "元";
    resultEl.style.display = "none";
    setTimeout(function () { resultEl.style.display = "block"; }, 500);

    drawTable(result[0]);
}

function resetLoan() {
    amountEl.value = "";
    rateEl.value = "";
    yearsEl.value = "";
    resultEl.style.display = "none";
    tableEl.innerHTML = "";
    tableallEl.style.display = "none";

}

function rule1(totalAmount, years, rate) {
    let amount = totalAmount;
    let period = years * 12;
    let month_pay = parseInt(amount / period);
    let month_rate = rate / 100 / 12;

    let totalInterest = 0;
    let datas = [];
    for (let i = 0; i < period; i++) {
        interest = Math.round(amount * month_rate);
        amount -= month_pay;
        if (i == period - 1) {
            datas.push([i + 1, month_pay + amount, interest, month_pay + amount + interest, 0]);
        }
        else {
            datas.push([i + 1, month_pay, interest, month_pay + interest, amount]);
        }
        totalInterest += interest;
    }
    // console.log(datas);
    return [datas, totalInterest];
}

function drawTable(datas) {
    let tableStr = "";
    for (let i = 0; i < datas.length; i++) {
        tableStr += "<tr>";
        for (let j = 0; j < datas[i].length; j++) {
            tableStr += `<td>${datas[i][j]}</td>`
        }
        tableStr += "</tr>";
    }
    tableEl.innerHTML = tableStr;
    tableallEl.style.display = "none";
    setTimeout(function () { tableallEl.style.display = "block"; }, 500);


    // let tableStr = "<ul>";
    // for (let i = 0; i < datas.length; i++) {
    //     console.log(datas[i].join(","));
    //     tableStr += `<li>${datas[i].join(",")}</li>`;
    // }
    // tableStr += "</ul>";
    // console.log(tableStr);
    // tableEl.innerHTML = tableStr;

}

function rule2(totalAmount, years, rate) {
    let amount = totalAmount;
    let period = years * 12;
    let month_rate = rate / 100 / 12;
    let mean_rate = (((1 + month_rate) ** period) * month_rate) / (((1 + month_rate) ** period) - 1);

    let totalInterest = 0;
    let datas = [];
    for (let i = 0; i < period; i++) {
        interest = Math.round(amount * month_rate)
        totalmonth_pay = Math.round(totalAmount * mean_rate)
        month_pay = totalmonth_pay - interest
        amount -= month_pay
        if (i == period - 1) {
            datas.push([i + 1, month_pay, interest, totalmonth_pay, 0]);
        }
        else {
            datas.push([i + 1, month_pay, interest, totalmonth_pay, amount]);
        }

        totalInterest += interest;
    }
    console.log(datas);
    return [datas, totalInterest, totalmonth_pay * period];
}

function showExample() {
    let rule = payment1El.checked ? 1 : 2;
    if (rule == 1) {
        example1El.style.display = "block";
        example2El.style.display = "none";
    } else {
        example2El.style.display = "block";
        example1El.style.display = "none";
    }

}
