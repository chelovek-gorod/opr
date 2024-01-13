const exampleMarks = {
    price: 5,
    cores: 7,
    OS: 4,
    camera: 3,
    rating: 2,
}
const markRates = {
    price: 0,
    cores: 0,
    OS: 0,
    camera: 0,
    rating: 0,
}

const resultElectraTable = document.getElementById('result-electra-table')
const resultElectraTableBody = resultElectraTable.querySelector('tbody')

const electraMarkOSInput = document.getElementById('electra-OS-mark')
const electraMarkCoresInput = document.getElementById('electra-cores-mark')
const electraMarkCameraInput = document.getElementById('electra-camera-mark')
const electraMarkRatingInput = document.getElementById('electra-rating-mark')
const electraMarkPriceInput = document.getElementById('electra-price-mark')

// Сумма весов должна быть равна 1
function setMarkRates(marksObject) {
    let sum = 0
    for (let m in marksObject) sum += marksObject[m]
    const rate = 1 / sum
    for(let key in marksObject) markRates[key] = marksObject[key] * rate

    updateResultElectra()
}

function getRandomMarksElectra() {
    defaultMarksFillDiv.style.display = 'none'

    electraMarkOSInput.value = exampleMarks.OS
    electraMarkCoresInput.value = exampleMarks.cores
    electraMarkCameraInput.value = exampleMarks.camera
    electraMarkRatingInput.value = exampleMarks.rating
    electraMarkPriceInput.value = exampleMarks.price

    setMarkRates(exampleMarks)
}

function setElectroMark(input) {
    const minMark = 1
    const maxMark = 10

    let mark = +input.value
    mark = +(mark.toFixed(0))

    if (isNaN(mark) || mark < minMark) mark = minMark
    else if (mark > maxMark) mark = maxMark
    input.value = mark

    updateMarksElectra()
}

function updateMarksElectra() {
    if (+electraMarkOSInput.value === 0
    || +electraMarkCoresInput.value === 0
    || +electraMarkCameraInput.value === 0
    || +electraMarkRatingInput.value === 0
    || +electraMarkPriceInput.value === 0) {
        resultElectraTable.style.display = 'none'
        return
    }

    const marksObject = {
        price: +electraMarkPriceInput.value,
        cores: +electraMarkCoresInput.value,
        OS: +electraMarkOSInput.value,
        camera: +electraMarkCameraInput.value,
        rating: +electraMarkRatingInput.value,
    }

    setMarkRates(marksObject)
}

function getElectraResult() {
    resultElectraTable.style.display = 'none'
    resultTable.style.display = 'none'
    defaultMarksFillDiv.style.display = 'block'
    defaultMarksFillDiv.onclick = getRandomMarksElectra
}

function updateResultElectra() {
    console.log('markRates: ', markRates)

    const matrixSize = smartphones.length
    const matrix = new Array(matrixSize)
    // Создаем матрицу сравнения для 5-ти свойств каждого смартфона
    for(let i = 0; i < matrix.length; i++) matrix[i] = new Array(matrixSize).fill(0)
    
    // Попарное сравнение
    for(let i = 0; i < matrixSize; i++) {
        for(let j = 0; j < matrixSize; j++) {
            if (i === j) continue

            let score = 0
            for(let property in markRates) {
                if (property === 'price') {
                    if (smartphones[i][property] < smartphones[j][property]) score += markRates[property]
                    else if (smartphones[i][property] > smartphones[j][property]) score -= markRates[property]
                } else {
                    if (smartphones[i][property] > smartphones[j][property]) score += markRates[property]
                    else if (smartphones[i][property] < smartphones[j][property]) score -= markRates[property]
                }
            }
            matrix[i][j] = score
        }
    }

    let max_solution_index = 0
    let max_solution_value = 0
    let solution_values = []
    for(let i = 0; i < matrixSize; i++) {
        let sum = 0
        for(let j = 0; j < matrixSize; j++) sum += matrix[i][j]
        if (sum > max_solution_value) {
            max_solution_value = sum
            max_solution_index = i
        }
        solution_values.push(sum)
    }
    console.log(matrix)
    console.log('solution_values', solution_values)
    console.log('max_solution_index', max_solution_index)
    console.log('max_solution_value', max_solution_value)

    /////////////////////////////////////////////////////

    const tableData = []
    smartphones.forEach((smartphone, i) => {
        tableData.push({
            model: smartphone.model,
            price: smartphone.price,
            cores: smartphone.cores,
            OS: smartphone.OS,
            camera: smartphone.camera,
            rating : smartphone.rating,
            rang : solution_values[i],
        })
    })
    tableData.sort((a, b) => b.rang - a.rang)

    resultElectraTableBody.innerHTML = ''
    tableData.forEach(smartphone => {
        const tr = document.createElement('tr')
        tr.className = smartphone.rang < max_solution_value ? 'red' : 'green'
        tr.innerHTML = `<td>${smartphone.model}</td>`
        tr.innerHTML += `<td>${OS.getText(smartphone.OS)}</td>`
        tr.innerHTML += `<td>${smartphone.cores}</td>`
        tr.innerHTML += `<td>${smartphone.camera}</td>`
        tr.innerHTML += `<td>${smartphone.rating}</td>`
        tr.innerHTML += `<td>${smartphone.price.toFixed(2)}</td>`
        tr.innerHTML += `<td>${smartphone.rang.toFixed(5)}</td>`
        resultElectraTableBody.append(tr)
    })
    resultElectraTable.style.display = 'block'

    if (tableData[tableData.length - 1].rang === max_solution_value) {
        resultFilterButton.style.display = 'none'
        return
    }

    resultFilterButton.style.display = 'block'
    resultFilterButton.onclick = () => {
        resultElectraTableBody.querySelectorAll('tr').forEach( tr => {
            if (tr.className === 'red') tr.remove()
            smartphones.forEach( (id, i) => {
                if (solution_values[i] < max_solution_value) setTimeout( () => id.remove(), 0 )
            })
        })
        resultFilterButton.style.display = 'none'
    }
}

