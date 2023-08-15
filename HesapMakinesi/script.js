const input = document.querySelector(".input");
const operators = document.querySelector(".calculator-operators");


let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue= false;  // ikinci değeri bekliyor mu

updateDisplay();



function updateDisplay(){
    display.value=displayValue;
}


input.addEventListener("click",function(e){

    const element = e.target;

    if(element.matches("button")) return;  // sadece buttona tıkladığımızda tepki versin 



    // hangi butona bastığımızı kontrol ediyoruz

    if(element.classList.contain("opeator")){
       // console.log("operator",element.value); // operatore tıkladıysak operator bilgisi döner
        
       handleOperator(element.value);
       updateDisplay();
       
       return;
    }



    if(element.classList.contain("decimal")){
      //  console.log("decimal",element.value); 
        inputDecimal(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contain("clear")){
       // console.log("clear",element.value); 
        
       clear();
       updateDisplay();
       return;
    }



   // console.log("number",element.value);   // eğer yukardaki buttonlara basılmadıysa sayıya basılmıştır


    inputNumber(element.value); // elementin yani girilen sayının değerini alma
    updateDisplay();
 

})


function handleOperator(nextOpeator){
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue){   // operator ve ikinci değer true ise operatoru güncelle
        operator= nextOpeator;
        return;
    }



    if(firstValue== null){  // ilk değer boşsa girilen sayıyı ona at
        firstValue= value;

    }else if(operator){
        const sonuc = calculate(firstValue,value,operator);

        displayValue=`${parseFloat(sonuc.toFixed(7))}`;
        firstValue = sonuc;


    }
    waitingForSecondValue= true;  // ilk değer girildikten sonra ikincisini beklet ilk değeri ekranda gösterme
    operator= nextOpeator;    // operatoru ata  

}




function calculate(first,second,operator){

    if(operator=== "+"){
        return first + second;
    } 
    else if(operator=== "-"){
        return first - second;
    }
    else if(operator=== "*"){
        return first * second;
    } else if(operator=== "/"){
        return first / second;

    }
    return second;







function inputNumber(num){    
    if(waitingForSecondValue=true){
        displayValue=num;
        waitingForSecondValue=false;

    }
    else{
            displayValue= displayValue=== "0" ? num : displayValue+ num;   // değeri 0 a eşitse num a aktarırız değilse daha önce girilen sayıyıda yazdırarak girilen sayıyı yazdırır
    }

    

}

function inputDecimal(){
    if(!displayValue.includes(".")){  // daha önce noktaya basılmamışsa ekle 
        displayValue+=".";
    }
    
}

function clear(){
    displayValue="0";

}
}