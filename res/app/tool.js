



UTC app w/map and image

lat/long app

dictionary...

sign document...

    <section class="container">
        <div id="toolbar">
            <h1>Draw.</h1>
            <label for="stroke">Stroke</label>
            <input id="stroke" name='stroke' type="color">
            <label for="lineWidth">Line Width</label>
            <input id="lineWidth" name='lineWidth' type="number" value="5">
            <button id="clear">Clear</button>
        </div>
        <div class="drawing-board">
            <canvas id="drawing-board"></canvas>
        </div>
    </section>

const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => { if (e.target.id === 'clear') { ctx.clearRect(0, 0, canvas.width, canvas.height); } });

toolbar.addEventListener('change', e => { if(e.target.id === 'stroke') { ctx.strokeStyle = e.target.value; }

    if(e.target.id === 'lineWidth') { lineWidth = e.target.value; } });

const draw = (e) => {
    if(!isPainting) { return; }
    ctx.lineWidth = lineWidth; ctx.lineCap = 'round'; ctx.lineTo(e.clientX - canvasOffsetX, e.clientY); ctx.stroke(); }

canvas.addEventListener('mousedown', (e) => { isPainting = true; startX = e.clientX; startY = e.clientY; });
canvas.addEventListener('mouseup', e => { isPainting = false; ctx.stroke(); ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);

//https://codepen.io/javascriptacademy-stash/pen/porpeoJ

address autocomplete...

<form>
<input name="address" placeholder="Address" type="text" autocomplete="address-line1" />
<input name="apartment" placeholder="Apartment number" type="text" autocomplete="address-line2" />
<input name="city" placeholder="City" type="text" autocomplete="address-level2" />
<input name="state" placeholder="State" type="text" autocomplete="address-level1" />
<input name="country" placeholder="Country" type="text" autocomplete="country" />
<input name="postcode" placeholder="Postcode" type="text" autocomplete="postal-code" />
</form>

<script id="search-js" defer src="https://api.mapbox.com/search-js/v1.0.0-beta.11/web.js"></script>
<script>        
const script = document.getElementById('search-js');
script.onload = function() { mapboxsearch.autofill({ accessToken: 'your access token here' }); };
</script>

<form>
<input name="address" placeholder="Address" type="text" autocomplete="address-line1" />
<input name="apartment" placeholder="Apartment number" type="text" autocomplete="address-line2" />
<input name="city" placeholder="City" type="text" autocomplete="address-level2" />
<input name="state" placeholder="State" type="text" autocomplete="address-level1" />
<input name="country" placeholder="Country" type="text" autocomplete="country" />
<input name="postcode" placeholder="Postcode" type="text" autocomplete="postal-code" />
</form>


//https://docs.mapbox.com/mapbox-search-js/tutorials/add-address-autofill-to-your-website/
