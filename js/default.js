const OS = {
    text:  ['Нет', 'Да'],
    value: [0.33, 0.67],
    getValue(data) {
        switch(data) {
            case 0 :
            case false :
            case 'Нет' : return this.value[0];
            default : return this.value[1];
        }
    },
    getText(data) {
        switch(data) {
            case 0 :
            case false :
            case 0.33 : return this.text[0];
            default : return this.text[1];
        }
    },
}

let dataSet = [
    {
        model: 'Apple iPhone SE 2022 64GB',
        price: 1450.00,
        cores: 6,
        OS: OS.getValue(true),
        camera: 12,
        rating: 4.7,
    },

    {
        model: 'Samsung Galaxy XCover 5 SM-G525F/DS 4GB/64GB',
        price: 990.00,
        cores: 8,
        OS: OS.getValue(true),
        camera: 16,
        rating: 2.4,
    },

    {
        model: 'Huawei P50 ABR-LX9 8GB/256GB',
        price: 2100,
        cores: 8,
        OS: OS.getValue(true),
        camera: 50,
        rating: 4.6,
    },

    {
        model: 'Realme C30s 4GB/64GB',
        price: 334.04,
        cores: 8,
        OS: OS.getValue(true),
        camera: 8,
        rating: 3.7,
    },

    {
        model: 'Realme C11 2021 RMX3231 4GB/64GB',
        price: 299.00,
        cores: 8,
        OS: OS.getValue(true),
        camera: 8,
        rating: 3.0,
    },

    {
        model: 'Xiaomi 13T Pro 12GB/512GB',
        price: 2295.00,
        cores: 8,
        OS: OS.getValue(true),
        camera: 50,
        rating: 4.0,
    },

    {
        model: 'Infinix Hot 30i X669D 8GB/128GB',
        price: 339.00,
        cores: 8,
        OS: OS.getValue(false),
        camera: 13,
        rating: 3.7,
    },

    {
        model: 'Infinix Note 30i 8GB/256GB',
        price: 479.00,
        cores: 8,
        OS: OS.getValue(false),
        camera: 64,
        rating: 5,
    },

    {
        model: 'Apple iPhone 15 128GB',
        price: 3205,
        cores: 6,
        OS: OS.getValue(true),
        camera: 48,
        rating: 4.6,
    },

    {
        model: 'Samsung Galaxy S23 SM-S911B/DS 8GB/128GB',
        price: 2345.00,
        cores: 8,
        OS: OS.getValue(true),
        camera: 50,
        rating: 4.9,
    },

    {
        model: 'Apple iPhone 14 128GB',
        price: 2685.00,
        cores: 6,
        OS: OS.getValue(true),
        camera: 12,
        rating: 4.6,
    },

    {
        model: 'Samsung Galaxy A54 5G SM-A546E/DS 8GB/256GB',
        price: 1298.00,
        cores: 8,
        OS: OS.getValue(true),
        camera: 50,
        rating: 4.6,
    },

    {
        model: 'HONOR X9b 8GB/256GB',
        price: 1099.00,
        cores: 8,
        isOS: OS.getValue(true),
        camera: 108,
        rating: 4.8,
    },

    {
        model: 'POCO X5 Pro 5G 8GB/256GB',
        price: 1200.00,
        cores: 8,
        OS: OS.getValue(true),
        camera: 108,
        rating: 4.7,
    },

    {
        model: 'POCO C65 6GB/128GB с NFC',
        price: 399.00,
        cores: 8,
        OS: OS.getValue(true),
        camera: 50,
        rating: 4.9,
    },

    {
        model: 'Google Pixel 8 8GB/128GB',
        price: 3120.00,
        cores: 9,
        OS: OS.getValue(true),
        camera: 50,
        rating: 4.8,
    },
]
dataSet.sort(() => Math.random() < 0.5)