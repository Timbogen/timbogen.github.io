class ASCIIArt {
    /**
     * The possible characters for the ASCII art
     */
    characters = ["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m",
                  "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t",
                  "/", "\\", "|", "(", ")", "1", "{", "}", "[", "] ", "?", "-", "_", "+", "~", "<", ">", "i", "!",
                  "l", "I", ";", ":", ",", "\"", "^", "`", "'", ".", " "];

    /**
     * The value for a white field
     */
    white = 69;

    /**
     * The image's original size
     */
    imageWidth = 300;
    imageHeight = 870;

    /**
     * The amount of characters that make up one row of the ASCII art
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
    imageData = [];

    /**
     * The matrix responsible for drawing the background (for the ascii art)
     */
    background = [];

    /**
     * The matrix responsible for drawing the foreground (mostly for animation)
     */
    foreground = [];

    /**
     * The size fields
     */
    offsetX = 0;
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
        this.getImageData();

        // Enable the mouse interaction
        this.enableInteraction();

        // Start the painting interval
        setInterval(this.updateView, 16);
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

        // Calculate the size and the offset
        this.size = this.width > this.height ? this.height : this.width;
        this.charWidth = this.size / this.charCount;
        this.offsetX = Math.floor((this.width - this.size) / 2 / this.charWidth);

        // Set the right text size
        this.ctx.font = `${this.charWidth}px serif`;
        this.ctx.textBaseline = "hanging";

        // Update the matrices
        this.updateMatrices();
    };

    /**
     * Iterate over the image and analyze the brightness
     */
    getImageData = () => {
        // Hide the canvas
        this.canvas.style.display = "none";

        // Analyze the image
        const charHeight = this.imageHeight / this.imageWidth * this.charCount;
        const image = document.getElementById("image");
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.drawImage(image, 0, 0, this.imageWidth, this.imageHeight, 0, 0, this.charCount, charHeight);
        this.imageData = []
        for (let i = 0; i < this.charCount; i++) {
            this.imageData.push([])
            for (let j = 0; j < charHeight; j++) {
                this.imageData[i].push(this.getBrightnessValue(this.ctx.getImageData(i, j, 1, 1).data));
            }
        }

        // Erase the image and show the canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.canvas.style.display = "block";

        // Update the matrices
        this.updateMatrices();
    };

    /**
     * Update the background and foreground matrices
     */
    updateMatrices = () => {
        const m = this.width / this.charWidth;
        const n = this.height / this.charWidth;

        // Fill the matrices with default values
        this.background = [];
        this.foreground = [];
        for (let i = 0; i < m; i++) {
            this.background.push([])
            this.foreground.push([])
            for (let j = 0; j < n; j++) {
                this.background[i].push(this.white)
                this.foreground[i].push(this.white)
            }
        }

        // Fill the background with the image data
        this.imageData.forEach((row, i) => {
            row.forEach((value, j) => {
                this.background[i + this.offsetX][j] = this.imageData[i][j];
            });
        });
    }

    /**
     * Enable the interaction with the mouse
     */
    enableInteraction = () => {
        window.addEventListener("mousemove", evt => {
            try {
                // Calculate the position of the mouse in the field
                const x = Math.floor(evt.clientX / this.charWidth);
                const y = Math.floor(evt.clientY / this.charWidth);

                // Set the field and some neighbors to some darker values
                this.foreground[x][y] = 0;
                this.foreground[x - 1][y] = 1;
                this.foreground[x + 1][y] = 2;
                this.foreground[x][y - 1] = 3;
                this.foreground[x][y + 1] = 4;
            } catch (e) {}
        });
    }

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
     * The update routine
     */
    updateView = () => {
        // Update the foreground
        this.updateForeground();

        // Start the painting
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "#333333";
        this.background.forEach((row, i) => {
            row.forEach((value, j) => {
                const actualValue = Math.floor(Math.min(value, this.foreground[i][j]));
                this.ctx.fillText(this.characters[actualValue], i * this.charWidth, j * this.charWidth);
            });
        });
    };

    /**
     * Update the foreground matrix
     */
    updateForeground = () => {
        this.foreground.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value < this.white) this.foreground[i][j] = value + 1;
            });
        });
    };
}

// Wait for the HTML to be initialized
window.onload = () => new ASCIIArt();
