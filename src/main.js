/** @type {HTMLVideoElement} */
const VIDEO = document.createElement('video')
let TRACKS
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#myCanvas')
const ctx = canvas.getContext('2d')

// window.addEventListener('load', () => {
// })

function stop() {
    console.log(TRACKS)
    TRACKS.forEach(track => {
        track.stop()
    });
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
    setInterval(()=> {
        ctx.drawImage(VIDEO, 0, 0)
    }, 40)
    
}