(() => {
    const nav = document.querySelectorAll('.nav-elem');
    const hamburger = document.querySelector('.ham-burgur');
    const cross = document.querySelector('.cross');
    const sideNav = document.querySelector('.side-navbar');
    const sideNavElem = document.querySelectorAll('.side-nav');


    
    function navEvent() {
        nav.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                let idName = e.target.innerText;
                const elementSection = document.getElementById(idName);
                let coordinates = elementSection.getBoundingClientRect();
                let currPos = 0;
                let finalPos = coordinates.y;
                let sclEvent = setInterval(function () {
                    if (currPos >= finalPos) clearInterval(sclEvent);
                    currPos += 60;
                    window.scrollBy(0, 50);
                }, 60);

                putActive(element);
            });
        });
    }
    function sideEventHandler() {
        sideNavElem.forEach(elem => {
            elem.addEventListener('click', hamburgerFunction);
        });
    }

    function hamburgerEvent() {
        hamburger.addEventListener('click', hamburgerFunction);
        cross.addEventListener('click', hamburgerFunction);
    }
    function hamburgerFunction() {
        hamburger.classList.toggle('open');
        sideNav.classList.toggle('displayNone');
        setTimeout(() => {
            sideNav.classList.toggle('sideAnimation');
        }, 250)
    }

    function putActive(curr) {
        nav.forEach(elem => {
            elem.classList.remove('active');
        })
        if (!curr.classList.contains('btn')) curr.classList.add('active');
        else {
            let data = curr.getAttribute('data');
            if (data) {
                document.getElementById(data).classList.add('active');
            }
        }
    }
    function widthAjustor() {
        if (window.innerWidth > 800) {
            if (!sideNav.classList.contains('displayNode')) {
                console.log('Coming');
                sideNav.classList.add('displayNone');
                sideNav.classList.remove('sideAnimation');
            }
        }
    }
    function scrollTop() {
        const btnScroll = document.querySelector('.move-up');
        btnScroll.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        })
    }


    //  auto fill
    const progressBars = document.querySelectorAll('.skill-bar > div');
    const skillsContainer = document.getElementById("Skills");
    let animationDone = false;
    function fillBars() {
        progressBars.forEach(bar => {
            let targetWidth = bar.getAttribute('data-width');
            let curWidth = 0;
            let interval = setInterval(() => {
                if (curWidth > targetWidth) {
                    clearInterval(interval);
                    return;
                }
                curWidth++;
                bar.style.width = `${curWidth}%`;
            }, 10);
        });
    }

    function intialize() {
        progressBars.forEach(bar => {
            bar.style.width = "0%";
        })
    }
    function checkScroll() {
        console.log('Coming');
        let coordinate = skillsContainer.getBoundingClientRect();
        if (!animationDone && coordinate.top <= window.innerHeight) {
            animationDone = true;
            fillBars();
        } else if (coordinate.top > window.innerHeight) {
            animationDone = false;
            intialize();
        }

    }
    function windowEventListeners() {
        window.addEventListener('resize', widthAjustor);
        window.addEventListener('scroll', checkScroll);

    }
    function autoTyper() {
        const dest = document.querySelector('.type');
        let strings = [
            "Code Enthusiast",
            "Full Stack Developer",
            "Java Programmer"
        ];
        let cur = "|";
        let j = 0;
        let i = 0;
        let value = "";
        let isBack=false;
        let id = setInterval(() => {
            if (j == strings.length) {
                j = 0;
                i=0;
                value="";
            }
            else if(i==-1){
                j++;
                isBack=false;
                i=0;
                value="";
            }
            else if (i == strings[j].length) isBack=true;
            if(j<strings.length && !isBack) value += strings[j][i++];
            if(isBack) value=strings[j].substring(0,i--);
            dest.innerText = value + cur;
        }, 100);


    }

    function render() {
        navEvent();
        hamburgerEvent();
        sideEventHandler();
        intialize();
        windowEventListeners();
        scrollTop();
        autoTyper();
    }
    render();
})();