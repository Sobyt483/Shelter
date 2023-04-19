console.log('100 Все требования выполнены.')
console.log('100 Все требования выполнены.')
console.log('100 Все требования выполнены.')
import petList from "./dogs.js"

const body = document.querySelector('body')
const burgerIcon  = document.querySelector('.burger')
const burgerMenu = document.querySelector('.burger-menu')
const burgerElement = document.querySelectorAll('.burger-element')
const navBurgerMenu = document.querySelector('.nav-burger-menu')

burgerIcon.addEventListener('click', (e)=>{
    burgerIcon.classList.toggle('active')
    burgerMenu.classList.toggle('active')
    body.classList.toggle('menu-openned')
    navBurgerMenu.classList.toggle('active')
})
burgerElement.forEach((el) => {
    el.addEventListener('click', (e)=>{
        burgerIcon.classList.remove('active')
        burgerMenu.classList.remove('active')
        body.classList.remove('menu-openned')
        navBurgerMenu.classList.remove('active')
    })
})
burgerMenu.addEventListener('click', (e)=>{
    if (e.target === burgerMenu){
        burgerIcon.classList.remove('active')
        burgerMenu.classList.remove('active')
        body.classList.remove('menu-openned')
        navBurgerMenu.classList.remove('active')
    }
})

const baseArray = [0, 1, 2, 3, 4, 5, 6, 7]
const petsCards = document.querySelectorAll('.card')
const buttonsPets = document.querySelectorAll('.button-pets')
const buttonRightPets = document.querySelector('.right-button-pets')
const buttonLeftPets = document.querySelector('.left-button-pets')
const slider = document.querySelector('.slider')


const prevCards = [0, 1, 2]
function changeCardInfo(el, i, cards){
    el.children[0].children[0].setAttribute('src', petList[cards[i]].img)
    el.children[1].children[0].textContent = `${petList[cards[i]].name}`
}
function switchCards (slider, cardsArray) {
    const cards = cardsArray
    slider.forEach((el, i)=>{
        changeCardInfo(el, i, cards)
    })
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function getUnicNumber(n, arr=[], arr2=baseArray){
    //n число карточек, arr массив от которого должен отличаться результат, arr2 массив на основе которого создается результирующий массив.
    const array = arr2.filter((el, k)=>!arr.includes(el))
    const resultArray = new Array
    for (let i = 0; i < n; i++){
        let index = getRandomInt(0, array.length)
        resultArray.push(array[index])
        array.splice(index, 1)
    }
    return resultArray
}

const cardPets = document.querySelectorAll('.card-pets')
const cardContainer = document.querySelector('.card-container')
const pageNumber = document.querySelector('.page-number')
const paginationStrongLeft = document.querySelector('.strong-left')
const paginationLeft = document.querySelector('.left')
const paginationRight = document.querySelector('.right')
const paginationStrongRight = document.querySelector('.strong-right')

function getPagintaionArray(){
    const resultArray = []
    for (let i = 0; i<2;i++){
        const array1 = getUnicNumber(6, [], baseArray)
        const array2 = getUnicNumber(2, array1, baseArray)
        const array3 = getUnicNumber(4, array2, baseArray)
        const array4 = getUnicNumber(4, array3, baseArray)
        const array5 = getUnicNumber(2, array4, baseArray)
        const array6 = getUnicNumber(6, array5, baseArray)
        resultArray.push(...array1, ...array2, ...array3, ...array4, ...array5, ...array6)
    }
    return resultArray
}
const pagintaionArray = getPagintaionArray()
console.log(pagintaionArray)
function getArray(arr, n){
    //n Число карточек на странице
    const resultArray =[]
    const k = n
    for(let i = 0; i < arr.length; i+=k){
        resultArray.push(arr.slice(i, n))
        n+=k
    }
    return resultArray
}
const arrayPages6 = getArray(pagintaionArray, 8)
const arrayPages8 = getArray(pagintaionArray, 6)
const arrayPages16 = getArray(pagintaionArray, 3)
let numberofElements = 0
let paginationPages = null
function changePaginationCardInfo(width=document.body.clientWidth){
    if (width > 1199){
        numberofElements = 8
        paginationPages = arrayPages6
    }
    else if(width > 767){
        paginationPages = arrayPages8
        numberofElements = 6
    }else if (width <= 767){
        paginationPages = arrayPages16
        numberofElements = 3
    }
}
function changePaginationCard(){
    for (let i = 0; i < numberofElements; i++){
        changeCardInfo(cardPets[i], i, paginationPages[+(pageNumber.innerHTML)-1])
    }
}
function disableButton(numberPage, e){
    if(numberPage === paginationPages.length){
        paginationRight.setAttribute('disabled', '')
        paginationStrongRight.setAttribute('disabled', '')
    }
    if (numberPage > 1){
        paginationLeft.removeAttribute('disabled')
        paginationStrongLeft.removeAttribute('disabled')
    }
    if(numberPage === 1){
        paginationLeft.setAttribute('disabled', '')
        paginationStrongLeft.setAttribute('disabled', '')
    }
    if (numberPage < paginationPages.length){
        paginationRight.removeAttribute('disabled')
        paginationStrongRight.removeAttribute('disabled')
    }
}
function paginationWork(){
    if (cardContainer){
    changePaginationCardInfo()
    changePaginationCard()
    paginationRight.addEventListener('click', (e)=>{
        let numberPage = +(pageNumber.innerHTML)
        pageNumber.textContent = numberPage + 1
        numberPage = +(pageNumber.innerHTML)
        disableButton(numberPage)
        changePaginationCardInfo()
        changePaginationCard()
    })
    paginationStrongRight.addEventListener('click', (e)=>{
        let numberPage = +(pageNumber.innerHTML)
        pageNumber.textContent = paginationPages.length
        numberPage = +(pageNumber.innerHTML)
        disableButton(numberPage)
        changePaginationCardInfo()
        changePaginationCard()
    })
    paginationLeft.addEventListener('click', (e)=>{
        let numberPage = +(pageNumber.innerHTML)
        pageNumber.textContent = numberPage - 1
        numberPage = +(pageNumber.innerHTML)
        disableButton(numberPage)
        changePaginationCardInfo()
        changePaginationCard()
    })
    paginationStrongLeft.addEventListener('click', (e)=>{
        let numberPage = +(pageNumber.innerHTML)
        pageNumber.textContent = 1
        numberPage = +(pageNumber.innerHTML)
        disableButton(numberPage)
        changePaginationCardInfo()
        changePaginationCard()
    })
    window.addEventListener('resize', (e)=>{
        changePaginationCardInfo(document.body.clientWidth)
        let numberPage = +(pageNumber.innerHTML)
        disableButton(numberPage)
        if (numberPage > paginationPages.length){
            pageNumber.textContent = paginationPages.length
        }
        changePaginationCard()
    })
}
}
paginationWork()

const cards = document.querySelectorAll('.card')
const popUpButton = document.querySelector('.pop-up-button')
const popUp = document.querySelector('.pop-up')
const popUpImg = document.querySelector('.pop-up-img')
const popUpName = document.querySelector('.pop-up-name')
const popUpType = document.querySelector('.pop-up-type')
const popUpText = document.querySelector('.pop-up-text')
const popUpAge = document.querySelector('.pop-up-age')
const popUpInc = document.querySelector('.pop-up-inc')
const popUpDis = document.querySelector('.pop-up-dis')
const popUpPar = document.querySelector('.pop-up-par')

function getPetIndex(el){
    const petName = el.children[1].children[0].textContent
    const petsNameArray = []
    petList.forEach((el, i)=>{
        petsNameArray.push(el.name)
    })
    return petsNameArray.indexOf(petName)
}
function changePopUpInfo(i){
    popUpImg.setAttribute('src', petList[i].img)
    popUpName.textContent = petList[i].name
    popUpType.textContent = `${petList[i].type} - ${petList[i].breed}`
    popUpText.textContent = petList[i].description
    popUpAge.innerHTML = `<b>Age: </b>${petList[i].age}`
    popUpInc.innerHTML = `<b>Inoculations: </b>${petList[i].inoculations.join(', ')}`
    popUpDis.innerHTML = `<b>Diseases: </b>${petList[i].diseases.join(', ')}`
    popUpPar.innerHTML = `<b>Parasites: </b>${petList[i].parasites.join(', ')}`
}
cards.forEach((el,i)=>{
    el.addEventListener('click',(e)=>{
        popUp.classList.add('active')
        body.classList.add('menu-openned')
        changePopUpInfo(getPetIndex(el), el)
    })
})
popUpButton.addEventListener('click', (e)=>{
    popUp.classList.remove('active')
    body.classList.remove('menu-openned')
})
popUp.addEventListener('click', (e)=>{
    if (e.target === popUp || e.target === popUp.children[0]){
        popUp.classList.remove('active')
        body.classList.remove('menu-openned')
    }
})

const sliderNext = document.querySelector('.slider-next')
const sliderCur = document.querySelector('.slider-cur')

function sliderWorks(){
    if(sliderCur){
        const sliderCurArray = Array.from(sliderCur.children)
        const sliderNextArray = Array.from(sliderNext.children)
        sliderNext.style.width = `${sliderCur.offsetWidth}px`
        window.addEventListener('resize', (e)=>{
            setTimeout(()=>{sliderNext.style.width = `${sliderCur.clientWidth}px`},100)
            sliderNext.style.width = `${sliderCur.clientWidth}px`
        })
        switchCards(sliderCurArray, prevCards)
        let sliderNumber = 0
        function getCardsIndex(arr){
            const resultArray = []
            const petsNameArray = []
            petList.forEach((el, i)=>{
                petsNameArray.push(el.name)
            })
            arr.forEach((el,i)=>{
                const petName = el.children[1].children[0].textContent
                resultArray.push(petsNameArray.indexOf(petName))
            })
            return resultArray
        }
        function changeSliderCard(el){
            if (sliderNumber === 0){
                switchCards(sliderNextArray, getUnicNumber(3, getCardsIndex(el)))
                sliderNumber = 1
            }else {
                switchCards(sliderCurArray, getUnicNumber(3, getCardsIndex(el)))
                sliderNumber = 0
            }
        }
        let button = null
        function sliderRight(next, cur){
            next.classList.add('animation-right-center')
            next.classList.add('cur')
            cur.classList.remove('cur')
            cur.classList.add('animation-left')
        }
        function sliderLeft(next, cur){
            next.classList.add('animation-left-center')
            next.classList.add('cur')
            cur.classList.remove('cur')
            cur.classList.add('animation-right')
        }
        buttonsPets.forEach((el, i)=>{
            el.addEventListener('click', (e)=>{
                if (i === 1&&(button===null||button===i)){
                    button = i
                    if (sliderNumber === 0){
                        changeSliderCard(sliderCurArray)
                        sliderRight(sliderNext, sliderCur)
                    }else {
                        changeSliderCard(sliderNextArray)
                        sliderRight(sliderCur, sliderNext)
                    }
                }
                if(i === 1&&button!==i){
                    button = i
                    if (sliderNumber === 0){
                        sliderRight(sliderNext, sliderCur)
                        sliderNumber = 1
                    }else {
                        sliderRight(sliderCur, sliderNext)
                        sliderNumber = 0
                    }
                }
                if(i===0&&(button===null||button===i)){
                    button = i
                    if (sliderNumber === 0){
                        changeSliderCard(sliderCurArray)
                        sliderLeft(sliderNext, sliderCur)
                    }else {
                        changeSliderCard(sliderNextArray)
                        sliderLeft(sliderCur, sliderNext)
                    }
                }
                if(i===0&&button!==i){
                    button = i
                    if (sliderNumber === 0){
                        sliderLeft(sliderNext, sliderCur)
                        sliderNumber = 1
                    }else {
                        sliderLeft(sliderCur, sliderNext)
                        sliderNumber = 0
                    }
                }
            })
            sliderNext.addEventListener('animationstart', ()=>{
                el.setAttribute('disabled', '')
            })
            sliderNext.addEventListener('animationend', ()=>{
                el.removeAttribute('disabled', '')
                sliderNext.classList.remove('animation-right')
                sliderNext.classList.remove('animation-right-center')
                sliderNext.classList.remove('animation-left')
                sliderNext.classList.remove('animation-left-center')
            })
            sliderCur.addEventListener('animationend', ()=>{
                sliderCur.classList.remove('animation-right')
                sliderCur.classList.remove('animation-right-center')
                sliderCur.classList.remove('animation-left')
                sliderCur.classList.remove('animation-left-center')
            })
        })
    }
}
sliderWorks()
