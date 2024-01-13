function getParetoResult() {

    const getOptionsData = (checkbox, key) => {
        let text = resultPareto.querySelector(`label[for=${checkbox.id}]`).innerText
        let maxValue = 0
        for (let smartphone of smartphones) {
            if (smartphone[key] > maxValue) maxValue = smartphone[key]
        }
        let scale = 250 / maxValue
        return {text, scale, key}
    }

    let options = []
    for (let option in paretoOptions) {
        if (paretoOptions[option]) {
            let key = option.slice(2)
            if (key !== 'OS') key = key.toLowerCase()
            switch(option) {
                case 'isOS' : options.push( getOptionsData(resultParetoCheckboxOS, key)) ; break;
                case 'isCores' : options.push( getOptionsData(resultParetoCheckboxCores, key) ); break;
                case 'isCamera' : options.push( getOptionsData(resultParetoCheckboxCamera, key) ); break;
                case 'isRating' : options.push( getOptionsData(resultParetoCheckboxRating, key) ); break;
                case 'isPrice' : options.push( getOptionsData(resultParetoCheckboxPrice, key) ); break;
            }
        }
    }

    if (options.length < 2) return alert('\nНеобходимо выбрать минимум два свойства для сравнения')

    const centerX = 280
    const centerY = 280

    let stepLineAngle = options.length === 2 ? -Math.PI / 2 : (Math.PI * 2) / options.length
    let lineAngle = 0
    const lineLength = centerX - 20

    let lineColors = ['#ff0000', '#ff9800', '#ffff00', '#00ff00', '#12972b', '#00dcb9', '#00bfff', '#0000ff',
                      '#8800bb', '#ff05db', '#ff055e', '#795548', '#9e9e9e', '#ffc107', '#607d8b', '#467840']
    let lineColorIndex = lineColors.length - 1
    const getNextLineColor = () => {
        lineColorIndex++
        if (lineColorIndex >= lineColors.length) lineColorIndex = 0
        return lineColors[lineColorIndex]
    }

    const getNextLinePoint = (value = lineLength) => {
        let x = Math.cos(lineAngle) * value
        let y = Math.sin(lineAngle) * value
        lineAngle += stepLineAngle

        return([centerX + x, centerY + y])
    }

    // рисуем оси
    paretoCtx.clearRect(0, 0, resultParetoCanvas.width, resultParetoCanvas.height)
    paretoCtx.lineWidth = 1
    paretoCtx.strokeStyle = '#777777'
    for (let i = 0; i < options.length; i++) {
        paretoCtx.beginPath()
        paretoCtx.moveTo(centerX, centerY)
        let [x, y] = getNextLinePoint()
        paretoCtx.lineTo(x, y)
        paretoCtx.stroke()
    }

    // рисуем точки параметров
    paretoCtx.lineWidth = 2
    let textX = centerX * 2 + 20
    let smartphoneStepSizeY = 20
    let smartphoneNumber = 0
    for (let smartphone of smartphones) {
        smartphoneNumber += 1
        let textY = smartphoneNumber * smartphoneStepSizeY
        lineAngle = 0
        let startPoints = null
        paretoCtx.strokeStyle = getNextLineColor()
        paretoCtx.beginPath()
        for (let option of options) {
            //console.log(option.key, option.scale, smartphone, smartphone[option.key])
            let x, y
            if (option.key === 'price') [x, y] = getNextLinePoint(lineLength - option.scale * smartphone[option.key])
            else [x, y] = getNextLinePoint(option.scale * smartphone[option.key])
            if (startPoints) paretoCtx.lineTo(x, y)
            else {
                paretoCtx.moveTo(x, y)
                startPoints = [x, y]
            }
        }
        paretoCtx.lineTo(...startPoints)
        paretoCtx.stroke()
        new TextCanvas(smartphone.model, textX, textY, {color: paretoCtx.strokeStyle, size: 12}).draw(paretoCtx)
    }

    // рисуем текст
    lineAngle = 0
    for (let i = 0; i < options.length; i++) {
        let [x, y] = getNextLinePoint()
        let textAlign = 'center'
        if (x < centerX / 2) {
            textAlign = 'left'
            x -= 12
        }
        else if (x > centerX + centerX / 2) {
            textAlign = 'right'
            x += 12
        }
        if (y < centerY + 1) y -= 12
        new TextCanvas(options[i].text, x, y, {color: '#000000', size: 12, align: textAlign}).draw(paretoCtx)
    }

    // определяем худшие варианты
    let worstSmartphones = []
    for(let i = 0; i < smartphones.length; i++) {
        for(let j = 0; j < smartphones.length; j++) {
            if (j === i) continue
            let worstList = []
            let isWorst = true
            for (let option of options) {
                if (option.key === 'price') {
                    if (smartphones[i][option.key] < smartphones[j][option.key]) {
                        isWorst = false
                        continue
                    } else worstList.push(option.key)
                } else {
                    if (smartphones[i][option.key] > smartphones[j][option.key]) {
                        isWorst = false
                        continue
                    } else worstList.push(option.key)
                }
            }
            if (isWorst) {
                console.log(`${smartphones[i].model} хуже чем ${smartphones[j].model} по ${worstList}`)
                if (worstSmartphones.indexOf(i) < 0) worstSmartphones.push(i)
                continue
            }
        }
    }

    resultTableBody.innerHTML = ''

    smartphones.forEach((smartphone, i) => {
        if (worstSmartphones.indexOf(i) < 0) {
            const tr = document.createElement('tr')
            tr.className = 'green'
            tr.innerHTML = `<td>${smartphone.model}</td>`
            tr.innerHTML += `<td>${OS.getText(smartphone.OS)}</td>`
            tr.innerHTML += `<td>${smartphone.cores}</td>`
            tr.innerHTML += `<td>${smartphone.camera}</td>`
            tr.innerHTML += `<td>${smartphone.rating}</td>`
            tr.innerHTML += `<td>${smartphone.price.toFixed(2)}</td>`
            resultTableBody.append(tr)
        }
    })

    if (worstSmartphones.length === 0) return

    smartphones.forEach((smartphone, i) => {
        if (worstSmartphones.indexOf(i) >= 0) {
            const tr = document.createElement('tr')
            tr.className = 'red'
            tr.innerHTML = `<td>${smartphone.model}</td>`
            tr.innerHTML += `<td>${OS.getText(smartphone.OS)}</td>`
            tr.innerHTML += `<td>${smartphone.cores}</td>`
            tr.innerHTML += `<td>${smartphone.camera}</td>`
            tr.innerHTML += `<td>${smartphone.rating}</td>`
            tr.innerHTML += `<td>${smartphone.price.toFixed(2)}</td>`
            resultTableBody.append(tr)
        }
    })

    resultFilterButton.style.display = 'block'
    resultFilterButton.onclick = () => {
        resultTableBody.querySelectorAll('tr').forEach( tr => {
            if (tr.className === 'red') tr.remove()
            smartphones.forEach( (id, i) => {
                if (worstSmartphones.indexOf(i) >= 0) setTimeout( () => id.remove(), 0 )
            })
        })
        resultFilterButton.style.display = 'none'
    }
}