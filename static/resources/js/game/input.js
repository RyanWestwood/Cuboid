export function Input() {
    self = this;

    //  PC
    self.isLeftPressed = false;
    self.isRightPressed = false;
    self.isEnterPressed = false;

    //  On the event of a key event. Checks the key value, if the value is a left 
    //  or right key. It changes the the pressed variable to the value. 
    //  true if down, false if up.
    let handleKeyEvent = (e, isKeyDown) => {
        if (e.keyCode == 37) {
            self.isLeftPressed = isKeyDown;
        }

        if (e.keyCode == 39) {
            self.isRightPressed = isKeyDown;
        }

        if(e.keyCode == 13){
            self.isEnterPressed = isKeyDown;
        }
    }

    document.addEventListener("keydown", function (e) { handleKeyEvent(e, true) });
    document.addEventListener("keyup", function (e) { handleKeyEvent(e, false) });

    //  Mobile
    self.isLeftTap = false;
    self.isRightTap = false

    //  On the event of a tap event. Checks the tap position, if the value is the left 
    //  or right side of the screen. It changes the the tapped variable to the value. 
    //  if left half of the screen is tapped, isLeft becomes true. right becomes false.
    let handleTapEvent = (e, isTapped) => {
        if (e.touches[0].clientX <= window.innerWidth / 2) {
            self.isLeftTap = isTapped;
        } else {
            self.isRightTap = isTapped;
        }
    }

    document.addEventListener('touchstart', function (e) { handleTapEvent(e, true) });
    document.addEventListener('touchend', function (e) { handleTapEvent(e, false) });


}
