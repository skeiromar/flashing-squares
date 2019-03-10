Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

document.addEventListener("DOMContentLoaded", function(){
    const canvas = document.querySelector('#mycanvas');
    const ch = canvas.height = '750';
    const cw = canvas.width = '1529';
    
    // we can only fill the shape within the confines of its width
    // and height.
    const ctx = canvas.getContext('2d');

    const arr = [150, 250, 200, 300, 100]

    for (let i = 0; i < arr.length; i++) {
        arr[i] += 60;
    }



    // function drawHex(arr) {
    //     ctx.beginPath();
    //     ctx.moveTo(arr[0], arr[0]); // initial x,y coords for 
    //     ctx.lineTo(arr[1], arr[0]); // first line from x,y coords
    //     ctx.lineTo(arr[3], arr[2]); // second line from first line
    //     ctx.lineTo(arr[3], arr[1]); // 3rd line from 2nd line
    //     ctx.lineTo(arr[1], arr[3]);
    //     ctx.lineTo(arr[0], arr[3]);
    //     ctx.lineTo(arr[4], arr[1]);
    //     ctx.lineTo(arr[4], arr[2]);
    //     ctx.lineTo(arr[0]+2, arr[0]-1);
    //     ctx.strokeStyle = 'rgb(200, 100, 100)';
    //     ctx.lineWidth = 8;
    //     ctx.stroke();
    //     ctx.fillStyle = 'rgb(100, 200, 100)';
    //     // ctx.lineTo(200, 150);
    //     ctx.fill();
    //     ctx.closePath();
    // }
    // drawHex(arr);


    function randColor1() {
        return `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    let randColor = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;

    function randomShapeDrawer(size, move, color = 'blue') {
        ctx.beginPath();
        let locx, locy;
        [locx, locy] = move;
        ctx.fillStyle = randColor1();
        ctx.moveTo(locx, locy);
        ctx.lineTo(locx+size, locy); 
        ctx.lineTo(locx, locy+size);
        ctx.lineTo(locx-size, locy);
        ctx.lineTo(locx, locy-size); 
        ctx.lineTo(locx+size, locy);
        ctx.fill();
        ctx.closePath();
    }
    const offsets = [1, -1, 1, -1];
    // for (let i = 0 ;i < 20  ; i++) {
        //     let locx = getRandomInt(cw);
        //     let locy = getRandomInt(ch); 
        //     randomShapeDrawer(30, [locx+i, locy+i])
        // }

    const funcCall = randomShapeDrawer;
    const items = [];
    for (let i = 0; i < 1000; i++) {
        let locx = getRandomInt(cw);
        let locy = getRandomInt(ch); 
        items.push({
            render : funcCall,
            location : [locx, locy],
            size : 20, 
            color: randColor1()
        });
    }

    let arr1 = [400, 200];
    funcCall(20, arr1);
    randColor = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
    
    let startTime = new Date().getTime();
    setInterval(() => {
        if(new Date().getTime() - startTime > 50000){
            clearInterval(interval);
            return;
        }
        // ctx.clearRect(arr1[0]-20, arr1[1]-20, arr1[0]+20, arr1[1]+20);
        arr1[0] += offsets.random();
        arr1[1] += offsets.random();

        // y += 20
        funcCall(20, arr1, randColor);
        items.forEach(el => {
            let movex = offsets.random();
            let movey = offsets.random();
            const ram = 1;
            // ctx.clearRect(el.location[0]-21, el.location[1]-21,
            //     el.location[0]+21, el.location[1]+21);

                el.location[0] += movex;
                el.location[1] += movey;
                el.render(el.size, el.location, el.color);
            
        });
    }, 10);

});
