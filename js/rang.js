const resultRangTable = document.getElementById('result-rang-table')
const resultRangTableBody = resultRangTable.querySelector('tbody')

function changeMark( expertIndex, smartphoneIndex, input ) {
    const minMark = 0
    const maxMark = 10

    let mark = +input.value
    mark = +(mark.toFixed(1))

    if (isNaN(mark) || mark < minMark) mark = minMark
    else if (mark > maxMark) mark = maxMark
    input.value = mark
    expertMarks[expertIndex][smartphoneIndex] = mark

    updateRanges()
}

function updateRanges() {
    let isAllRangesExists = true
    expertMarks.forEach( list => {
        for(let i = 0; i < list.length; i++) {
            if (list[i] === 0) {
                isAllRangesExists = false
                break
            }
        }
    })

    if (isAllRangesExists === false) {
        resultRangTable.style.display = 'none'
        console.warn('not all items get marks')
        return 
    }

    let rangeSum = 0 // Находится сумма всех оценок 
    let ranges = [] // Находятся суммарные оценки альтернатив всеми экспертами
    for(let i = 0; i < expertMarks[0].length; i++) {
        rangeSum += expertMarks[0][i]
        rangeSum += expertMarks[1][i]
        ranges.push(expertMarks[0][i] + expertMarks[1][i])
    }
    ranges.forEach( (range, i) => {
        ranges[i] = range / rangeSum //  веса альтернатив
    })

    const tableData = []
    smartphones.forEach((smartphone, i) => {
        tableData.push({
            model: smartphone.model,
            price: smartphone.price,
            cores: smartphone.cores,
            OS: smartphone.OS,
            camera: smartphone.camera,
            rating : smartphone.rating,
            rang : ranges[i],
        })
    })
    tableData.sort((a, b) => b.rang - a.rang)

    let ratingToDellMin = tableData[0].rang / 2
    resultRangTableBody.innerHTML = ''
    tableData.forEach(smartphone => {
        const tr = document.createElement('tr')
        tr.className = smartphone.rang < ratingToDellMin ? 'red' : 'green'
        tr.innerHTML = `<td>${smartphone.model}</td>`
        tr.innerHTML += `<td>${OS.getText(smartphone.OS)}</td>`
        tr.innerHTML += `<td>${smartphone.cores}</td>`
        tr.innerHTML += `<td>${smartphone.camera}</td>`
        tr.innerHTML += `<td>${smartphone.rating}</td>`
        tr.innerHTML += `<td>${smartphone.price.toFixed(2)}</td>`
        tr.innerHTML += `<td>${smartphone.rang.toFixed(5)}</td>`
        resultRangTableBody.append(tr)
    })
    resultRangTable.style.display = 'block'

    if (tableData[tableData.length - 1].rang > ratingToDellMin) {
        resultFilterButton.style.display = 'none'
        return
    }

    resultFilterButton.style.display = 'block'
    resultFilterButton.onclick = () => {
        resultRangTableBody.querySelectorAll('tr').forEach( tr => {
            if (tr.className === 'red') tr.remove()
            smartphones.forEach( (id, i) => {
                if (ranges[i] < ratingToDellMin) setTimeout( () => id.remove(), 0 )
            })
        })
        resultFilterButton.style.display = 'none'
    }
}

function getRandomExperts() {
    defaultExpertsFillDiv.style.display = 'none'
    const experts = [ {
        price: Math.ceil(4 + Math.random() * 5), // 4
        cores: Math.ceil(5 + Math.random() * 5), // 5
        OS: Math.ceil(3 + Math.random() * 5),    // 3
        camera: Math.ceil(2 + Math.random() * 5),// 2
        rating: Math.ceil(1 + Math.random() * 5),// 1
    },{
        price: Math.ceil(1 + Math.random() * 5), // 1
        cores: Math.ceil(3 + Math.random() * 5), // 3
        OS: Math.ceil(5 + Math.random() * 5),    // 5
        camera: Math.ceil(4 + Math.random() * 5),// 4
        rating: Math.ceil(2 + Math.random() * 5),// 2
    }]

    experts.forEach( (expert, expertIndex) => {
        let maxMark = 0
        smartphones.forEach((smartphone, i) => {
            let mark = (smartphone.price / (expert.price * 10))
                     + (smartphone.cores * expert.cores)
                     + (smartphone.OS * expert.cores * 10)
                     + (smartphone.camera * expert.camera)
                     + (smartphone.rating * expert.rating)

            expertMarks[expertIndex][i] = mark
            if (mark > maxMark) maxMark = mark
        })

        let markRate = 10 / maxMark

        for (let i = 0; i < expertMarks[expertIndex].length; i++) {
            expertMarks[expertIndex][i] = +(expertMarks[expertIndex][i] * markRate).toFixed(1)
        }

        const inputsList = expertTables[expertIndex].querySelectorAll('input')

        smartphones.forEach((smartphone, i) => inputsList[i].value = expertMarks[expertIndex][i])
    })
    
    updateRanges()
}

const expertTables = [document.getElementById('rang-1'), document.getElementById('rang-2')]
const expertMarks = [null, null]

function rangReset() {
    expertTables.forEach( table => table.innerHTML = '')
    expertMarks.forEach( (mark, i) => expertMarks[i] = null )
    resultTable.style.display = 'block'
}

function getRangResult() {
    resultRangTable.style.display = 'none'
    resultTable.style.display = 'none'
    defaultExpertsFillDiv.style.display = 'block'
    defaultExpertsFillDiv.onclick = getRandomExperts

    console.log(expertMarks)

    // 2 эксперта со своими оценками каждой модели смартфона
    expertMarks[0] = new Array(smartphones.length).fill(0)
    expertMarks[1] = new Array(smartphones.length).fill(0)

    console.log(expertMarks)
    
    smartphones.forEach((smartphone, i) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${smartphone.model}</td>`
        tr.innerHTML += `<td><input type="number" value="0" min="0" max="10" step="0.1" onchange="changeMark(0, ${i}, this)"></td>`
        expertTables[0].append(tr)
    })
    smartphones.forEach((smartphone, i) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${smartphone.model}</td>`
        tr.innerHTML += `<td><input type="number" value="0" min="0" max="10" step="0.1" onchange="changeMark(1, ${i}, this)"></td>`
        expertTables[1].append(tr)
    })

    smartphones.forEach(smartphone => {
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${smartphone.model}</td>`
        tr.innerHTML += `<td>${OS.getText(smartphone.OS)}</td>`
        tr.innerHTML += `<td>${smartphone.cores}</td>`
        tr.innerHTML += `<td>${smartphone.camera}</td>`
        tr.innerHTML += `<td>${smartphone.rating}</td>`
        tr.innerHTML += `<td>${smartphone.price.toFixed(2)}</td>`
        resultTableBody.append(tr)
    })
}