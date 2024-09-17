class Controls{
    constructor(){
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.lastKey = null;
        window.addEventListener('keydown',({key}) => {
          if(key === 'ArrowLeft'){
            this.left = true;
            this.lastKey = 'left';
          }
          if(key === 'ArrowRight'){
            this.right = true;
            this.lastKey = 'right';
          }
          if (key === 'ArrowUp') {
            this.up = true;
            this.lastKey = 'up';
          }
          if (key === 'ArrowDown') {
            this.down = true;
            this.lastKey = 'down';
          }
        });
        window.addEventListener('keyup',({key}) => {
            if(key === 'ArrowLeft'){
              this.left = false;
              if(this.lastKey === 'left'){
                 this.lastKey = null;
              }
            }
            if(key === 'ArrowRight'){
              this.right = false;
              if(this.lastKey === 'right'){
                 this.lastKey = null;
              }
            }
            if (key === 'ArrowUp') {
              this.up = false;
              if (this.lastKey === 'up') {
                  this.lastKey = null;
              }
            }
            if (key === 'ArrowDown') {
              this.down = false;
              if (this.lastKey === 'down') {
                  this.lastKey = null;
              }
            }
          });
    }
}

export default Controls;