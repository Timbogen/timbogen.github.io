class ASCIIArt {
    /**
     * The possible characters for the ASCII art
     */
    characters = ["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m",
                  "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t",
                  "/", "\\", "|", "(", ")", "1", "{", "}", "[", "] ", "?", "-", "_", "+", "~", "<", ">", "i", "!",
                  "l", "I", ";", ":", ",", "\"", "^", "`", "'", ".", " "];

    /**
     * The amount of characters that make up the ASCII art
     */
    charCount = 100;

    /**
     * The actual canvas element
     */
    canvas = document.getElementById("canvas");

    /**
     * The context
     */
    ctx = this.canvas.getContext("2d");

    /**
     * The image data for drawing the ascii art
     */
    imageData = [[]];

    /**
     * The size fields
     */
    offsetX = 0;
    offsetY = 0;
    width = 0;
    height = 0;
    size = 0;
    charWidth = 0;

    /**
     * Constructor
     */
    constructor() {
        // Watch for resizing
        window.addEventListener("resize", this.resizeCanvas);
        this.resizeCanvas();

        // Get the image data
        this.updateImageData();

        // Start the painting interval
        setInterval(this.paint, 10);
    }

    /**
     * Update the canvas size
     */
    resizeCanvas = () => {
        // Update the canvas size
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;

        // Calculate offset and size of the whole thing
        this.offsetX = this.width > this.height ? (this.width - this.height) / 2 : 0;
        this.offsetY = this.height > this.width ? (this.height - this.width) / 2 : 0;
        this.size = this.width > this.height ? this.height : this.width;

        // Set the right text size
        this.charWidth = this.size / this.charCount;
        this.ctx.font = `${this.charWidth}px serif`;
        this.ctx.textBaseline = "hanging";
    };

    /**
     * Get the brightness value (index for the matching character) for a given rgb array
     *
     * @param color An number array with 4 values for rgba
     * @return The brightness of the color
     */
    getBrightnessValue = (color) => {
        const brightness = (color[3] / 255) * ((0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2]) / 255);
        return this.characters.length * brightness;
    };

    /**
     * Iterate over the image and analyze the brightness
     */
    updateImageData = () => {
        // Hide the canvas
        this.canvas.style.display = "none";

        // Analyze the image
        const image = document.getElementById("image");
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.drawImage(image, 0, 0, this.charCount, this.charCount);
        this.imageData = [[]]
        for (let i = 0; i < this.charCount; i++) {
            this.imageData.push([])
            for (let j = 0; j < this.charCount; j++) {
                this.imageData[i].push(this.getBrightnessValue(this.ctx.getImageData(i, j, 1, 1).data));
            }
        }

        // Erase the image and show the canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.canvas.style.display = "block";
    };

    /**
     * The paint routine
     */
    paint = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "black";
        this.imageData.forEach((row, i) => {
            row.forEach((value, j) => {
                this.ctx.fillText(this.characters[Math.floor(value)], this.offsetX + i * this.charWidth, this.offsetY + j * this.charWidth);
            });
        });
    };
}

// Wait for the HTML to be initialized
window.onload = () => new ASCIIArt();
