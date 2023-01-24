import { writable } from "svelte/store";
const pinyin = (window as any).pinyinPro.pinyin;
export let firstName = writable(localStorage.firstName || "");
firstName.subscribe((value) => (localStorage.firstName = value));

export let preStr = writable(localStorage.preStr || "");
preStr.subscribe((value) => (localStorage.preStr = value));

const GetPreListString = ():string => {
  return localStorage.preList || "";
};
const GetPreList = ():string[]=>{
    let arr = GetPreListString() == "" ? [] : GetPreListString().split(",");
    return arr;
}
export const HasPre = (name):boolean=>{

    let arr = GetPreList();
    if (arr.findIndex(e=>e==name)==-1) {
        return false

    }
    return true;
}
export let preList = writable(GetPreListString());
export let GetWeight = (name)=>{

    let weight = Number.parseInt(localStorage[name + ":weight"] || "0");
    return weight;
}
export let AddWeight = (name) => {
  let arr = GetPreList();

  let weight = GetWeight(name);
  weight++;
  localStorage[name + ":weight"] = weight.toString();
  preList.set("");
  preList.set(arr.join(","));
};
export let MinusWeight = (name): boolean => {
  let weight =GetWeight(name);
  weight--;
  if (weight <= 0) {
    localStorage.removeItem(name + ":weight");
    let arr = GetPreList()
    arr = arr.filter((item) => item !== name);
    preList.set(arr.join(","));
    return true;
  } else {
    weight = Math.max(weight, 1);
    localStorage[name + ":weight"] = weight.toString();
    let tmp = GetPreListString();
    preList.set("");
    preList.set(tmp);
    return false;
  }
};
export let AddPre = (name) => {
  let arr = GetPreList();

  if (arr.findIndex((e) => e == name) == -1) {
    arr.push(name);
  }
  preList.set(arr.join(","));
};
export let RemovePre = (name) => {
  let arr = GetPreList()
  arr = arr.filter((e) => e !== name);
  preList.set(arr.join(","));
};
var wordChart = null;
var toneChart = null;
preList.subscribe((value) => {
  localStorage.preList = value;

  setTimeout(() => {
    let arry = (localStorage.preList as string).split(",");
    let wordMap = {};
    arry.forEach((element) => {
      let weight = Number.parseInt(localStorage[element + ":weight"] || "1");
      for (let i = 1; i < element.length; i++) {
        const ee = element[i];
        if (wordMap[ee] == null) {
          wordMap[ee] = {
            "2": 0,
            "3": 0,
          };
        }
        if (i == 1) {
          wordMap[ee]["2"] = wordMap[ee]["2"] + 1 * weight;
        } else if (i == 2) {
          wordMap[ee]["3"] = wordMap[ee]["3"] + 1 * weight;
        }
      }
    });
    let wordList = [];
    for (const key in wordMap) {
      const element = wordMap[key];

      wordList.push({ word: key, count: element["2"] + element["3"] });
    }
    wordList = wordList.sort((a, b) => {
      return b.count - a.count;
    });

    const wordChartCtx = document.getElementById("wordChart");
    const Chart = (window as any).Chart;
    if (wordChart !== null) {
      console.log(wordChart);
      wordChart.data.labels = wordList.map((e) => e.word);
      wordChart.data.datasets[0].data = wordList.map(
        (e) => wordMap[e.word]["2"]
      );
      wordChart.data.datasets[1].data = wordList.map(
        (e) => wordMap[e.word]["3"]
      );
      wordChart.update();
    } else {
      wordChart = new Chart(wordChartCtx, {
        type: "bar",
        data: {
          labels: wordList.map((e) => e.word),
          datasets: [
            {
              label: "# 2字统计",
              data: wordList.map((e) => wordMap[e.word]["2"]),
              borderWidth: 1,
            },
            {
              label: "# 3字统计",
              data: wordList.map((e) => wordMap[e.word]["3"]),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    let tone = {
      "2": [0, 0, 0, 0],
      "3": [0, 0, 0, 0],
    };
    // pinyin('汉语拼音', { pattern: 'num', type: 'array' }); // ["4", "3", "1", "1"]

    arry.forEach((element) => {
      let weight = Number.parseInt(localStorage[element + ":weight"] || "1");
      let toneList = pinyin(element, { pattern: "num", type: "array" });
      console.log(toneList);
      for (let i = 1; i < toneList.length; i++) {
        const ee = toneList[i];
        let toneNumber = Number.parseInt(ee);
        if (i == 1) {
          tone["2"][toneNumber - 1] = tone["2"][toneNumber - 1] + 1 * weight;
        } else if (i == 2) {
          tone["3"][toneNumber - 1] = tone["3"][toneNumber - 1] + 1 * weight;
        }
      }
    });
    const toneChartCtx = document.getElementById("toneChart");
    console.log(tone);
    if (toneChart !== null) {
      toneChart.data.datasets[0].data = tone["2"];
      toneChart.data.datasets[1].data = tone["3"];
      toneChart.update();
    } else {
      toneChart = new Chart(toneChartCtx, {
        type: "pie",
        data: {
          labels: ["一声", "二声", "三声", "四声"],
          datasets: [
            {
              label: "二字",
              data: tone["2"],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(150, 181, 86)",
              ],
              hoverOffset: 4,
            },
            {
              label: "三字",
              data: tone["3"],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(150, 181, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, 500);
});

