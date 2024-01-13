"use strict"

const main = document.querySelector('main')
const aboutSection = document.querySelector('.about')
const resultSection = document.querySelector('.result')
const resultTable = document.getElementById('result-table')
const resultTableBody = resultTable.querySelector('tbody')

const resultSingle = document.getElementById('single-result')
const resultSingleSelect = resultSingle.querySelector('select')
resultSingleSelect.onchange = getSingleResult

const resultRang = document.getElementById('rang-result')

const resultPareto = document.getElementById('pareto-result')
const resultParetoCheckboxOS = document.getElementById('pareto-OS')
resultParetoCheckboxOS.onchange = () => { paretoOptions.isOS = resultParetoCheckboxOS.checked; getParetoResult() }
const resultParetoCheckboxCores = document.getElementById('pareto-cores')
resultParetoCheckboxCores.onchange = () => { paretoOptions.isCores = resultParetoCheckboxCores.checked; getParetoResult() }
const resultParetoCheckboxCamera = document.getElementById('pareto-camera')
resultParetoCheckboxCamera.onchange = () => { paretoOptions.isCamera = resultParetoCheckboxCamera.checked; getParetoResult() }
const resultParetoCheckboxRating = document.getElementById('pareto-rating')
resultParetoCheckboxRating.onchange = () => { paretoOptions.isRating = resultParetoCheckboxRating.checked; getParetoResult() }
const resultParetoCheckboxPrice = document.getElementById('pareto-price')
resultParetoCheckboxPrice.onchange = () => { paretoOptions.isPrice = resultParetoCheckboxPrice.checked; getParetoResult() }
const paretoOptions = {
    isOS : resultParetoCheckboxOS.checked,
    isCores : resultParetoCheckboxCores.checked,
    isCamera : resultParetoCheckboxCamera.checked,
    isRating : resultParetoCheckboxRating.checked,
    isPrice : resultParetoCheckboxPrice.checked,
}
const resultParetoCanvas = document.getElementById('pareto-canvas')
const paretoCtx = resultParetoCanvas.getContext('2d')
resultParetoCanvas.width = 880
resultParetoCanvas.height = 580

const resultElectra = document.getElementById('electra-result')

const resultFilterButton = document.getElementById('result-filter-button')
const defaultSmartphonesFillDiv = document.getElementById('default-smartphones-fill')
const defaultExpertsFillDiv = document.getElementById('default-experts-fill')
const defaultMarksFillDiv = document.getElementById('default-marks-fill')
defaultSmartphonesFillDiv.onclick = () => {
    defaultSmartphonesFillDiv.style.display = 'none'
    dataSet.forEach( data => {
        const smartphone = new SmartphoneCard(data.model, data.price, data.cores, data.OS, data.camera, data.rating)
        smartphones.push(smartphone)
        smartphonesSection.append(smartphone.div)
    })
}

const smartphonesSection = document.querySelector('.smartphones')
const addSmartphoneBtn = document.getElementById('add-smartphone')
addSmartphoneBtn.onclick = () => {
    const smartphone = new SmartphoneCard()
    smartphones.push(smartphone)
    smartphonesSection.append(smartphone.div)
}

const removeResultBtn = document.getElementById('remove-result')
removeResultBtn.onclick = function () {
    aboutSection.style.display = 'block'
    setTimeout( () => aboutSection.classList.add('show'), 0 )

    resultSection.classList.remove('show')
    setTimeout( () => {
        resultSection.style.display = 'none'
        resultSingle.style.display = 'none'
        resultPareto.style.display = 'none'
        resultRang.style.display = 'none'
        resultElectra.style.display = 'none'

        resultFilterButton.style.display = 'none'
        resultTableBody.innerHTML = ''

        defaultExpertsFillDiv.style.display = 'none'
        defaultMarksFillDiv.style.display = 'none'
        
        rangReset()
    }, 600 )
}

const singleResultBtn = document.getElementById('single-btn')
singleResultBtn.onclick = function () {
    if (smartphones.length === 0) return alert('\nНе добавлено ни одного смартфона для сравнения')

    resultSingle.style.display = 'block'
    resultSection.style.display = 'block'
    setTimeout( () => resultSection.classList.add('show'), 0 )

    aboutSection.classList.remove('show')
    setTimeout( () => aboutSection.style.display = 'none', 600 )

    getSingleResult()
}

const rangResultBtn = document.getElementById('rang-btn')
rangResultBtn.onclick = function () {
    if (smartphones.length === 0) return alert('\nНе добавлено ни одного смартфона для сравнения')

    resultRang.style.display = 'block'
    resultSection.style.display = 'block'
    setTimeout( () => resultSection.classList.add('show'), 0 )

    aboutSection.classList.remove('show')
    setTimeout( () => aboutSection.style.display = 'none', 600 )

    getRangResult()
}

const paretoResultBtn = document.getElementById('pareto-btn')
paretoResultBtn.onclick = function () {
    if (smartphones.length === 0) return alert('\nНе добавлено ни одного смартфона для сравнения')

    resultPareto.style.display = 'block'
    resultSection.style.display = 'block'
    setTimeout( () => resultSection.classList.add('show'), 0 )

    aboutSection.classList.remove('show')
    setTimeout( () => aboutSection.style.display = 'none', 600 )

    getParetoResult()
}

const electraResultBtn = document.getElementById('electra-btn')
electraResultBtn.onclick = function () {
    if (smartphones.length === 0) return alert('\nНе добавлено ни одного смартфона для сравнения')

    resultElectra.style.display = 'block'
    resultSection.style.display = 'block'
    setTimeout( () => resultSection.classList.add('show'), 0 )

    aboutSection.classList.remove('show')
    setTimeout( () => aboutSection.style.display = 'none', 600 )

    getElectraResult()
}