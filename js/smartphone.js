let smartphones = []
let cardIdCounter = 0

class SmartphoneCard {
    constructor(model = null, price = 0, cores = 1, OSValue = OS.getValue(true), camera = 0, rating = 0) {
        cardIdCounter++

        this.model = model ? model : 'Новая модель ' + cardIdCounter
        this.price = price
        this.cores = cores
        this.OS = OSValue
        this.camera = camera
        this.rating = rating

        this.div = document.createElement('div')
        this.div.className = 'smartphone-card'

        this.line1 = document.createElement('div')
        this.line1.className = 'card-line'
        this.div.append(this.line1)

        this.line2 = document.createElement('div')
        this.line2.className = 'card-line'
        this.div.append(this.line2)

        this.line3 = document.createElement('div')
        this.line3.className = 'card-line'
        this.div.append(this.line3)

        this.removeDiv = document.createElement('div')
        this.removeDiv.className = 'remove-div'
        this.removeDiv.innerText = 'X'
        this.removeDiv.onclick = this.remove.bind(this)
        this.div.append(this.removeDiv)

        this.logo = document.createElement('img')
        this.logo.src = './src/images/smartphone_icon.png'
        this.logo.className = 'card-logo'
        this.line1.append(this.logo)

        this.modelDiv = document.createElement('div')
        this.line1.append(this.modelDiv)
        this.modelLabel = document.createElement('label')
        this.modelLabel.setAttribute('for', 'model' + cardIdCounter)
        this.modelLabel.className = 'model-label'
        this.modelLabel.innerText = 'Модель смартфона:'
        this.modelDiv.append(this.modelLabel)
        this.modelInput = document.createElement('input')
        this.modelInput.type = 'text'
        this.modelInput.id = 'model' + cardIdCounter
        this.modelInput.value = this.model
        this.modelInput.className = 'model'
        this.modelInput.onchange = this.setModel.bind(this)
        this.modelDiv.append(this.modelInput)

        // второй ряд (ОС, ядра, камера, цена)
        this.OSDiv = document.createElement('div')
        this.line2.append(this.OSDiv)
        this.OSLabel = document.createElement('label')
        this.OSLabel.setAttribute('for', 'OS' + cardIdCounter)
        this.OSLabel.className = 'OS-label'
        this.OSLabel.innerText = 'Операционная система:'
        this.OSDiv.append(this.OSLabel)
        this.OSSelect = document.createElement('select')
        this.OSSelect.id = 'OS' + cardIdCounter
        for(let i = 1; i >= 0; i--) {
            let option = document.createElement('option')
            option.value = OS.getValue(i)
            option.innerText = OS.getText(i)
            option.selected = OS.getValue(i) === this.OS
            this.OSSelect.append(option)
        }
        this.OSSelect.className = 'OS'
        this.OSSelect.onchange = this.setOS.bind(this)
        this.OSDiv.append(this.OSSelect)

        this.coresDiv = document.createElement('div')
        this.line2.append(this.coresDiv)
        this.coresLabel = document.createElement('label')
        this.coresLabel.setAttribute('for', 'cores' + cardIdCounter)
        this.coresLabel.className = 'cores-label'
        this.coresLabel.innerText = 'Ядер:'
        this.coresDiv.append(this.coresLabel)
        this.coresInput = document.createElement('input')
        this.coresInput.type = 'number'
        this.coresInput.id = 'cores' + cardIdCounter
        this.coresInput.step = '1'
        this.coresInput.min = '1'
        this.coresInput.value = this.cores
        this.coresInput.className = 'cores'
        this.coresInput.onchange = this.setCores.bind(this)
        this.coresDiv.append(this.coresInput)

        this.cameraDiv = document.createElement('div')
        this.line2.append(this.cameraDiv)
        this.cameraLabel = document.createElement('label')
        this.cameraLabel.setAttribute('for', 'camera' + cardIdCounter)
        this.cameraLabel.className = 'camera-label'
        this.cameraLabel.innerText = 'Камера (Мп):'
        this.cameraDiv.append(this.cameraLabel)
        this.cameraInput = document.createElement('input')
        this.cameraInput.type = 'number'
        this.cameraInput.id = 'camera' + cardIdCounter
        this.cameraInput.step = '0.01'
        this.cameraInput.min = '0'
        this.cameraInput.value = this.camera
        this.cameraInput.className = 'camera'
        this.cameraInput.onchange = this.setCamera.bind(this)
        this.cameraDiv.append(this.cameraInput)

        this.priceDiv = document.createElement('div')
        this.line2.append(this.priceDiv)
        this.priceLabel = document.createElement('label')
        this.priceLabel.setAttribute('for', 'price' + cardIdCounter)
        this.priceLabel.className = 'price-label'
        this.priceLabel.innerText = 'Цена (бел.руб.):'
        this.priceDiv.append(this.priceLabel)
        this.priceInput = document.createElement('input')
        this.priceInput.type = 'number'
        this.priceInput.id = 'price' + cardIdCounter
        this.priceInput.step = '0.01'
        this.priceInput.min = '0'
        this.priceInput.value = this.price
        this.priceInput.className = 'price'
        this.priceInput.onchange = this.setPrice.bind(this)
        this.priceDiv.append(this.priceInput)

        // третий ряд (рейтинг по отзывам)
        this.ratingLabel = document.createElement('label')
        this.ratingLabel.setAttribute('for', 'rating' + cardIdCounter)
        this.ratingLabel.className = 'rating-label'
        this.ratingLabel.innerText = 'Средняя оценка по отзывам (0...5):'
        this.line3.append(this.ratingLabel)
        this.ratingInput = document.createElement('input')
        this.ratingInput.type = 'range'
        this.ratingInput.id = 'rating' + cardIdCounter
        this.ratingInput.step = '0.1'
        this.ratingInput.min = '0'
        this.ratingInput.max = '5'
        this.ratingInput.value = this.rating
        this.ratingInput.className = 'rating'
        this.ratingInput.onchange = this.setRating.bind(this)
        this.line3.append(this.ratingInput)
        this.ratingValue = document.createElement('span')
        this.ratingValue.innerText = this.rating
        this.ratingValue.className = 'rating-value'
        this.line3.append(this.ratingValue)
    }

    remove() {
        this.div.style.animation = 'remove-smartphone 0.6s linear forwards'
        setTimeout(() => this.div.remove(), 600)
        smartphones = smartphones.filter( id => id !== this )
    }

    setModel() {
        this.model = this.modelInput.value
        console.log(this.model)
    }

    setOS() {
        this.OS = +this.OSSelect.value
        console.log(this.OS)
    }

    setCores() {
        this.cores = +this.coresInput.value
        console.log(this.cores)
    }

    setCamera() {
        this.camera = +this.cameraInput.value
        console.log(this.camera)
    }

    setPrice() {
        this.price = +this.priceInput.value
        console.log(this.price)
    }

    setRating() {
        this.rating = +this.ratingInput.value
        this.ratingValue.innerText = this.rating
    }
}