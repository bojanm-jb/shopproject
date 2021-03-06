
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    const mobileButton = document.querySelector('.collapsed.navbar-toggle'),
          dropDownMenu = document.querySelector('.collapse.navbar-collapse'),
          mobileOverlay = document.querySelector('.overlay');

    mobileButton.addEventListener('click', function () {
        dropDownMenu.classList.add('display-me');
        mobileOverlay.classList.add('show-me');
    });
    mobileOverlay.addEventListener('click', function () {
        this.classList.remove('show-me');
        dropDownMenu.classList.remove('display-me');
    });

    class Slider {
        constructor(slider, index) {
            this.options = {
                autoplay: true,
                interval: 3000,
                index: index,
            };
            this.slider = slider;
            this.sliderItems = document.querySelectorAll('#' + this.slider.id + ' .picture-slide');
            this.sliderDotItems = document.querySelectorAll('#' + this.slider.id + ' .dots');
            this.sliderWrapper = document.querySelector('#' + this.slider.id + ' .slider-picture-wrapper');
            this.sliderDotWrapper = document.querySelector('#' + this.slider.id + ' .slider-dots');
            this.addListener();
            this.sliderMove();
        }

        addListener() {
            document.querySelector('#' + this.slider.id + ' .left-button-arrow.arrows').addEventListener('click', (e) => {
                this.slideLeft();
            });
            document.querySelector('#' + this.slider.id + ' .right-button-arrow.arrows').addEventListener('click', (e) => {
                this.slideRight();
            });

            this.slider.addEventListener('mouseenter', () => {
                this.sliderStop();
            });

            this.slider.addEventListener('mouseleave', (e) => {
                this.sliderStart();
            });

            for (let i = 0 ; i < this.sliderDotItems.length; i++) {
                this.sliderDotItems[i].addEventListener('click' , (e) => {
                    this.setActiveDot(i);
                });
            }
        };

        slideRight() {
            for (let i = 0; i < this.sliderItems.length; i++) {
                let el = this.sliderItems[i];
                if (el.classList.contains('active')) {
                    if (i === this.sliderItems.length - 1) {
                        this.sliderItems[0].classList.add('active');
                        this.sliderItems[this.sliderItems.length - 1].classList.remove('active');
                        this.sliderWrapper.style.transform = `translateX(0%)`;
                        if (this.slider.contains(this.sliderDotWrapper)) {
                            this.sliderDotItems[this.sliderDotItems.length - 1].classList.remove('active');
                            this.sliderDotItems[0].classList.add('active');
                        }

                    } else {
                        this.sliderItems[i].classList.remove('active');
                        this.sliderItems[i + 1].classList.add('active');
                        this.sliderWrapper.style.transform = `translateX(-${i + 1}00%)`;
                        if (this.slider.contains(this.sliderDotWrapper)) {
                            this.sliderDotItems[i].classList.remove('active');
                            this.sliderDotItems[i + 1].classList.add('active');
                        }
                    }
                    return;
                }
            }
        }

        slideLeft() {
            for (let i = 0; i < this.sliderItems.length; i++) {
                let el = this.sliderItems[i];
                if (el.classList.contains('active')) {
                    if (i === 0) {
                        this.sliderItems[0].classList.remove('active');
                        this.sliderItems[this.sliderItems.length - 1].classList.add('active');
                        this.sliderWrapper.style.transform = `translateX(-${this.sliderItems.length - 1}00%)`;
                        if (this.slider.contains(this.sliderDotWrapper)) {
                            this.sliderDotItems[0].classList.remove('active');
                            this.sliderDotItems[this.sliderDotItems.length - 1].classList.add('active');
                        }
                    } else {
                        this.sliderItems[i].classList.remove('active');
                        this.sliderItems[i - 1].classList.add('active');
                        this.sliderWrapper.style.transform = `translateX(-${i - 1}00%)`;
                        if (this.slider.contains(this.sliderDotWrapper)) {
                            this.sliderDotItems[i].classList.remove('active');
                            this.sliderDotItems[i - 1].classList.add('active');
                        }
                    }
                    return;
                }
            }
        }

        sliderMove() {
            const timeout = this.options.index * 1000;

            setTimeout(() => {
                setInterval( (e) => {
                    if (this.options.autoplay) {
                        for (let i = 0; i < this.sliderItems.length; i++) {
                            let el = this.sliderItems[i];
                            if (el.classList.contains('active')) {
                                if (i === this.sliderItems.length - 1) {
                                    this.sliderItems[0].classList.add('active');
                                    this.sliderItems[this.sliderItems.length - 1].classList.remove('active');
                                    this.sliderWrapper.style.transform = `translateX(0%)`;
                                    if (this.slider.contains(this.sliderDotWrapper)) {
                                        this.sliderDotItems[0].classList.add('active');
                                        this.sliderDotItems[this.sliderDotItems.length - 1].classList.remove('active');
                                    }
                                } else {
                                    this.sliderItems[i].classList.remove('active');
                                    this.sliderItems[i + 1].classList.add('active');
                                    this.sliderWrapper.style.transform = `translateX(-${i + 1}00%)`;
                                    if (this.slider.contains(this.sliderDotWrapper)) {
                                        this.sliderDotItems[i].classList.remove('active');
                                        this.sliderDotItems[i + 1].classList.add('active');
                                    }
                                }
                                return;
                            }
                        }
                    }
                }, this.options.interval);
            }, timeout);
        }

        sliderStop() {
            this.options.autoplay = false;
        }

        sliderStart() {
            this.options.autoplay = true;
        }

        setActiveDot(i) {
            this.sliderDotItems.forEach( (element, index) => {
                if (i !== index) {
                    element.classList.remove('active');
                } else {
                    element.classList.add('active');
                     this.setSliderItemByIndex(index);
                }
            });
        }

        setSliderItemByIndex(index) {
            this.sliderWrapper.style.transform = `translateX(-${index}00%)`;
            this.sliderItems.forEach( (element) => {
                element.classList.remove('active');
                this.sliderItems[index].classList.add('active');
            });
        }

    }

    const sliders = document.querySelectorAll('.slider');
    sliders.forEach( (e, i) => {
       new Slider(e, i);
    });
