const smile = document.querySelector('.smile');
const tools = document.querySelectorAll('.tool i');
const about = document.querySelector('#about')
const slideContainer = document.querySelector('.slide-container');
const slide = document.querySelector('.slides');
const nextBtn = document.querySelector('#next-btn');
const PrevBtn = document.querySelector('#prev-btn');
const openNavBtn = document.querySelector('.open-nav');
const closeNavBtn = document.querySelector('.close-nav');
const navBar = document.querySelector('nav');
const sendMailBtn = document.querySelector('.send-mail-btn');
const clientName = document.querySelector('#client-name');
const clientEmail = document.querySelector('#client-email');
const mailBody = document.querySelector('#mail-body');
const popUp = document.querySelector('.pop-up');
const mode = document.querySelector('.mode');
const modeIcon = document.querySelector('.mode-icon');
const body = document.querySelector('body');
const sections = document.querySelectorAll('.menu a');
let slides = document.querySelectorAll('.slide');
let index = 1;
let interval = 9000;
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length -1].cloneNode(true);
let slideId;
let StartX;
let isDown =false;
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
slide.append(firstClone);
slide.prepend(lastClone);
let slideWidth = slides[index].clientWidth;
const getSlides =()=> document.querySelectorAll('.slide');
slide.style.transform =`translateX(${-slideWidth*index}px`
const moveToNext=()=>{
    slideWidth = slides[index].clientWidth
    slides = getSlides();    
    if (index >= slides.length-1) return
        index++;
        slide.style.transform =`translateX(${-slideWidth*index}px`
        slide.style.transition =`.7s`
}
const moveToPrevious=()=>{
    slideWidth = slides[index].clientWidth
    slides = getSlides();    
    if (index <=0) return
    index--;
    slide.style.transform =`translateX(${-slideWidth*index}px`
    slide.style.transition =`.7s`
}
const startSlide = ()=>{
    slideId= setInterval(() => {
        moveToNext()
    }, interval);
}
slide.addEventListener('transitionend',()=>{
    slides = document.querySelectorAll('.slide');
    if (slides[index].id === firstClone.id) {
        slide.style.transition =`none`
        index=1;
        slide.style.transform =`translateX(${-slideWidth*index}px`;
    }
    if (slides[index].id === lastClone.id) {
        slide.style.transition =`none`
        index=slides.length-1;
        slide.style.transform =`translateX(${-slideWidth*index}px`;
    }
    // if(slides[index].innerHTML.includes('span')){
    //     smile.style.transform = `rotate(90deg)`
    // } else {
    //     smile.style.transform = `rotate(0deg)`
    // }
})
startSlide()


slideContainer.addEventListener('mousedown',()=> isDown =true);
nextBtn.addEventListener('click',moveToNext);
PrevBtn.addEventListener('click',moveToPrevious);
const navOpenToggle =()=>{
    navBar.classList.toggle('active')
}
openNavBtn.addEventListener('click',navOpenToggle);
closeNavBtn.addEventListener('click',navOpenToggle);

const enableEmailBtn = ()=>{
    if (clientName.value ==='' || clientEmail.value === "" || mailBody.value==='' ){
        sendMailBtn.setAttribute('href','#contact');
    } else {
        const message = mailBody.value  +  `%0D%0AContact at:${clientEmail.value}`
        sendMailBtn.setAttribute('href',`mailto:vinhqua.io@gmail.com?subject=Hire Front End Developer from ${clientName.value}&body=${message}`)
    }
    

}
sections.forEach(section => section.addEventListener('click',()=>navBar.classList.remove('active')))
enableEmailBtn()
mailBody.addEventListener('input',enableEmailBtn)
clientName.addEventListener('input',enableEmailBtn)
clientEmail.addEventListener('input',enableEmailBtn)
const sendEmail = (e)=>{
    console.log(sendMailBtn.href)
    if (sendMailBtn.href.includes('#contact')){
        console.log('cliked')
        popUp.textContent ='Please fill in all fields'
        popUp.classList.add('active');
        setTimeout(() => {
            popUp.classList.remove('active');
        }, 1500);
        
    } else{
        popUp.textContent ='Thank You'
        popUp.classList.add('active');
        setTimeout(() => {
            popUp.classList.remove('active');
        }, 1500);
    }
     clientName.value ='';
     clientEmail.value = "";
     mailBody.value =''; 
    // console.log(e);
    //enableEmailBtn();
}
sendMailBtn.addEventListener('click',sendEmail);

let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
const setMode = ()=>{
    darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    if (darkMode === false){
        modeIcon.classList.replace('fa-sun','fa-moon');
        if (body.classList.contains('dark-mode')){body.classList.remove('dark-mode')}
    } else{
        modeIcon.classList.replace('fa-moon','fa-sun');
        body.classList.add('dark-mode');
    }
}
setMode();
const darkModeToggle =(e)=>{
    if (body.classList.contains('dark-mode')){
        localStorage.setItem('darkMode',JSON.stringify(false));
        setMode();
    } else{
        localStorage.setItem('darkMode',JSON.stringify(true));
        setMode();
    }
}
mode.addEventListener('click',darkModeToggle);
const toolColor = (e)=>{
    if (body.classList.contains('dark-mode')){
        tools.forEach(tool => tool.style.color = `#CAC691`);
        return
    } 
    console.log(this.scrollY);
    console.log(about.clientHeight);
    if (this.scrollY < about.clientHeight){
        tools.forEach(tool => tool.style.color = `white`);
    } else {
        tools.forEach(tool => tool.style.color = `black`);
    }
}
toolColor();
window.addEventListener('scroll',toolColor);
window.addEventListener('resize',()=>{
    index =1;
    slideWidth = slides[index].clientWidth
    slide.style.transform =`translateX(0)`
});
