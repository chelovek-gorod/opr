function getSingleResult() {

    console.log(resultSingleSelect.value, smartphones)
    smartphones.sort((a, b) => {
        switch(resultSingleSelect.value) {
            case 'OS' : return b.OS - a.OS;
            case 'price' : return a.price - b.price;
            case 'cores' : return b.cores - a.cores;
            case 'camera' : return b.camera - a.camera;
            case 'rating' : return b.rating - a.rating;
        }
    });
    console.log(resultSingleSelect.value, smartphones)

    if (resultSingleSelect.value !== 'price') {
        let groups = []
        let counter = 0
        while(smartphones.length) {
            let smartphone = smartphones.shift()
            if (groups.length && counter === smartphone[resultSingleSelect.value]) {
                groups[groups.length - 1].push(smartphone)
            } else {
                groups.push([smartphone])
                counter = smartphone[resultSingleSelect.value]
            }
        }
        while(groups.length) {
            let group = groups.shift()
            if (group.length > 1) group.sort((a, b) => a.price - b.price)
            smartphones = [...smartphones, ...group]
        }
    }

    resultTableBody.innerHTML = ''
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