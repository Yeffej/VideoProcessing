class Effects {
    Apply(effectName = "") {
        switch(effectName.toLocaleLowerCase()) {
            case "grayscale":
                this._Grayscale()
                break;
            case "brightscale": 
                this._BrightScale()
                break;
            case "doppelganger":
                this._Doppelganger();
                break;
            case "colorreverse": 
                this._ColorReverse();
                break;
            case "Normal":
                this._Normal();
                break;
            case "ghost":
                this._Ghost();
                break;
            case "mirror": 
                break;
        }
       
    }
    _Grayscale() {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
        // const BlankData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data
        for(let i = 0; i < imgData.data.length; i += 4) {
            const R = data[i]
            const G = data[i + 1]
            const B = data[i + 2]
            const A = data[i + 3]

            const brightness = this._GetBrightness(R, G, B)
            data[i] = brightness 
            data[i + 1] = brightness
            data[i + 2] = brightness
            data[i + 3] = A
        }

        ctx.putImageData(imgData, 0, 0)
        
        
    }
    _BrightScale() {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
        const data = imgData.data
        for(let i = 0; i < imgData.data.length; i += 4) {
            const R = data[i]
            const G = data[i + 1]
            const B = data[i + 2]
            const A = data[i + 3]

            const brightness = this._GetBrightness(R, G, B)
            data[i] = R 
            data[i + 1] = G
            data[i + 2] = B
            data[i + 3] = brightness
        }

        ctx.putImageData(imgData, 0, 0)
    }
    _Doppelganger() {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
        const data = imgData.data

        for(let y = 0; y < imgData.height; y++) {
            for(let x = 0; x < imgData.width/2; x++) {
                const pixel = this._getPixels(x, y, imgData)
                const pixel2 = this._getPixels(imgData.width - x, y, imgData)

                const R = data[pixel]
                const G = data[pixel + 1]
                const B = data[pixel + 2]
                const A = data[pixel + 3]

                data[pixel2] = R
                data[pixel2 + 1] = G
                data[pixel2 + 2] = B
                data[pixel2 + 3] = A
            }
        }

        ctx.putImageData(imgData, 0, 0)
    }
    _Ghost() {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
        const data = imgData.data
        for(let y = 0; y < imgData.height; y++) {
            for(let x = 0; x < imgData.width; x++) {
                const pixel = this._getPixels(x, y, imgData)
                const pixel2 = this._getPixels(imgData.width - x, y, imgData)

                const R = data[pixel]
                const G = data[pixel + 1]
                const B = data[pixel + 2]
                const A = data[pixel + 3]

                const R2 = data[pixel2]
                const G2 = data[pixel2 + 1]
                const B2 = data[pixel2 + 2]
                const A2 = data[pixel2 + 3]

                data[pixel2] = (R + R2) /2
                data[pixel2 + 1] = (G + G2) /2
                data[pixel2 + 2] = (B + B2) /2
                data[pixel2 + 3] = A 
            }
        }

        ctx.putImageData(imgData, 0, 0)
    }
    _ColorReverse() {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const data = imgData.data
        for(let i = 0; i < imgData.data.length; i += 4) {
            const R = data[i]
            const G = data[i + 1]
            const B = data[i + 2]
            const A = data[i + 3]


            data[i] = 255 - R
            data[i + 1] = 255 - G
            data[i + 2] = 255 - B
            data[i + 3] = A
        }
        ctx.putImageData(imgData, 0, 0)
    }
    _Normal() {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
        const BlankData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const realData = BlankData.data
        const data = imgData.data
        for(let y = 0; y < imgData.height; y++) {
            for(let x = 0; x < imgData.width; x++) {
                const pixel = this._getPixels(x, y, imgData)
                const pixel2 = this._getPixels(imgData.width - x, y, imgData)

                const R = data[pixel]
                const G = data[pixel + 1]
                const B = data[pixel + 2]
                const A = data[pixel + 3]

                realData[pixel2] = R
                realData[pixel2 + 1] = G
                realData[pixel2 + 2] = B
                realData[pixel2 + 3] = A
            }
        }

        ctx.putImageData(BlankData, 0, 0)
    }
    _GetBrightness(r, g, b) {
        return Math.sqrt(0.299*r**2 + 0.587*g**2 + 0.114*b**2)
    }
    _getPixels(x, y, data) {
        return (y * data.width * 4) + (x * 4)
    }
}


