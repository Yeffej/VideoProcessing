/** @type {HTMLVideoElement} */
const VIDEO = document.createElement('video')
const mainBGColor = "#ffffff";
let TRACKS
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#myCanvas')
const ctx = canvas.getContext('2d')
let LOOP_ID;
const SIZE = 300;
const effects = new Effects()
const AllEfxArray = ["normal", "grayscale", "brightscale",
 "doppelganger", "colorreverse", "ghost", "mirror"]

let EFX_INDEX = 0

function Stop() {
    console.log(TRACKS)
    TRACKS.forEach(track => {
        track.stop()
    });

    clearTimeout( LOOP_ID )
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

async function StartRecording() {
    if(!navigator.mediaDevices.getUserMedia)
        return;
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        TRACKS = stream.getTracks()
        VIDEO.srcObject = stream
        VIDEO.play()
        Animate()
    }catch (err) {
        console.error('Error: ', err)
        // TODO: show a message of an error to the user.
    }
        
}

function Animate() {
    LOOP_ID = setInterval(()=> {
        const min  = Math.min(VIDEO.videoWidth, VIDEO.videoHeight)
        const sx = (VIDEO.videoWidth - min) /2
        const sy = (VIDEO.videoHeight - min) /2
        const Xratio = VIDEO.videoWidth/min
        const Yratio = VIDEO.videoHeight/min

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(VIDEO, sx, sy, min, min, 0, 0, 
            canvas.width, canvas.height)
        effects.Apply(AllEfxArray[EFX_INDEX])
        
    }, 40)
    
}

function setEffect(value = 0) {
    EFX_INDEX = value
}