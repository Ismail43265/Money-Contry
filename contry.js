var ctr=0;
var ttm=0

function addMember(){
    ttm++;
    //var inpName=document.getElementById("IN1");
    var Newname=prompt("Enter Name")
    if (Newname === null || Newname.trim() === "") {
    return; // exit only if empty or canceled
    }

    var newMember=document.createElement("div");
    newMember.setAttribute("id","mem"+ctr);
    newMember.style.margin="10px";
    newMember.style.padding="10px";
    newMember.style.backgroundColor="#f1f0e4";
    newMember.style.borderRadius="6px";

    var ndiv=document.createElement("div");
    var Name=document.createElement("span");
    Name.textContent=Newname+" ";
    ndiv.appendChild(Name);

    var hcdiv=document.createElement("div");
    var txt1=document.createElement("span");
    txt1.textContent="My Money: "
    var hisContry=document.createElement("span");
    hisContry.textContent="0";
    hisContry.setAttribute("id","his"+ctr);
    hcdiv.appendChild(txt1);
    hcdiv.appendChild(hisContry);
    hcdiv.style.display = "flex";
    hcdiv.style.gap = "5px";
    

    var mgdiv=document.createElement("div");
    var txt2=document.createElement("span");
    txt2.textContent="Money Remain: "
    var moneyGive=document.createElement("span");
    moneyGive.textContent="0";
    moneyGive.setAttribute("id","give"+ctr);
    mgdiv.appendChild(txt2);
    mgdiv.appendChild(moneyGive);
    mgdiv.style.display = "flex";
    mgdiv.style.gap = "5px";

    var mabdiv=document.createElement("div");
    var moneyAddbtn=document.createElement("button");
    moneyAddbtn.setAttribute("id", "add"+ctr);
    moneyAddbtn.textContent="Add Money";
    moneyAddbtn.style.backgroundColor="#bca88d";
    moneyAddbtn.style.borderRadius="4px";
    mabdiv.appendChild(moneyAddbtn);

     moneyAddbtn.onclick = function () {
    let el = prompt("Enter money ");
    if (el === null) return;
    el = el.trim();
    if (el === "" || isNaN(el) || !Number.isInteger(Number(el))) {
      alert("Please enter a valid integer amount.");
      return;
    }
    const amount = Number(el);

    const current = Number(hisContry.textContent) || 0;
    hisContry.textContent = current + amount;

    updateTotalBy(amount);

    recomputeAllRemains();
  };

  // assemble
  newMember.appendChild(ndiv);
  newMember.appendChild(hcdiv);
  newMember.appendChild(mgdiv);
  newMember.appendChild(mabdiv);

  document.getElementById("lowerBodey").appendChild(newMember);

  recomputeAllRemains();

  ctr++;

}

function updateTotalBy(delta) {
  const tmEl = document.getElementById("TM");
  const cur = Number(tmEl.textContent) || 0;
  tmEl.textContent = cur + delta;
}

function recomputeAllRemains() {
  const tmEl = document.getElementById("TM");
  const total = Number(tmEl.textContent) || 0;
  const share = ttm ? total / ttm : 0;

  document.querySelectorAll('[id^="his"]').forEach(his => {
    const suffix = his.id.replace("his", "");     // same number
    const give = document.getElementById("give" + suffix);
    const mine = Number(his.textContent) || 0;
    const remain = mine - share;
    
    give.textContent = Number.isInteger(remain) ? String(remain) : remain.toFixed(2);
  });

}


