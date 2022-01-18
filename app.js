/*значение из тестовіх инпутов*/

const totalCost = document.getElementById('total-cost'),
      anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

/*значение из range инпутов*/

const totalCostRange = document.getElementById('total-cost-range'),
anInitialFeeRange = document.getElementById('an-initial-fee-range'),
creditTermRange = document.getElementById('credit-term-range');


const totalAmountOfCredit = document.getElementById('amount-of-credit'),
      totalMonthlyPayment = document.getElementById('monthly-payment'),
      totalRecommendedIncome = document.getElementById('recommended-income');

const inputsRange = document.querySelectorAll('.input-range');
const banksBtns = document.querySelectorAll('.bank');

const assignValue = () =>{
    totalCost.value = totalCostRange.value
    anInitialFee.value = anInitialFeeRange.value
    creditTerm.value = creditTermRange.value
}
assignValue()

const banks = [
    {
        name: 'alfa',
        precent: 8.7,
    },
    {
        name: 'sberbank',
        precent: 8.4,
    },
    {
        name: 'poshta',
        precent: 7.9,
    },
    {
        name: 'tinkoff',
        precent: 9.2,
    }
]

let currentPrecent = banks[0].precent

for(let bank of banksBtns){
    bank.addEventListener('click', () => {
        for(let item of banksBtns){
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank)
    })
}

const takeActiveBank = curentActive =>{
    const dataAttrValue = curentActive.dataset.name
    const currentBank = banks.find(bank => bank.name === dataAttrValue)
    currentPrecent = currentBank.precent
    calculation(totalCost.value, anInitialFee.value, creditTerm.value)
}

for(let input of inputsRange){
    input.addEventListener('input', () =>{
        assignValue()
        calculation(totalCost.value, anInitialFee.value, creditTerm.value)
    })
}

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    let mounthlyPayment 
    let lounAmount = totalCost - anInitialFee
    let interestRate = currentPrecent
    let numberOfYears = creditTerm
    let numberOfMounths = numberOfYears * 12

    monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMounths) / numberOfMounths
    const monthlyPaymentArounded = Math.round(monthlyPayment)

    if(monthlyPaymentArounded < 0){
        return false
    }else{
        totalAmountOfCredit.innerHTML = `${lounAmount} ₽`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;
        totalRecommendedIncome.innerHTML = `${Math.round(monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35))} ₽`;
    }
}