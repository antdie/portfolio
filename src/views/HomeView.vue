<script setup>
import IconSymfony from "@/components/icons/IconSymfony.vue";
import IconVuejs from "@/components/icons/IconVuejs.vue";
import IconJavascript from "@/components/icons/IconJavascript.vue";
import IconBootstrap from "@/components/icons/IconBootstrap.vue";
import IconSass from "@/components/icons/IconSass.vue";
import IconGit from "@/components/icons/IconGit.vue";
import IconDocker from "@/components/icons/IconDocker.vue";
import IconFigma from "@/components/icons/IconFigma.vue";
import IconLinux from "@/components/icons/IconLinux.vue";
import IconPhp from "@/components/icons/IconPhp.vue";
import IconPgsql from "@/components/icons/IconPgsql.vue";
import IconMysql from "@/components/icons/IconMysql.vue";
import IconWordpress from "@/components/icons/IconWordpress.vue";
import ButtonStyle from "@/components/ButtonStyle.vue";
import {ref, onMounted} from "vue";
import IconPhotoshop from "@/components/icons/IconPhotoshop.vue";

const props = defineProps(['cursor']);
const main = ref();
const resize = ref();
const scroller = ref();
const scrollWrapper = ref();
const prev = ref(false);
const next = ref(false);

let currentSlide = 1;
let isChanging = false;
let click = false;
let pagesNumber, scrollWrapperHeight, scrollWrapperOffsetTop, scrollerHeight, scrollerStartPos, scrollerResult;

onwheel = (e) => {
  if (!main?.value || isChanging) return;

  if (e.deltaY < 0) {
    changePage(-1);
  } else {
    changePage(1);
  }
}

onkeydown = (e) => {
  if (!main?.value || isChanging) return;

  if (e.key === 'ArrowUp' || e.key === 'Up') {
    changePage(-1)
  } else if (e.key === 'ArrowDown' || e.key === 'Down') {
    changePage(1)
  }
}

function onResizeEvent() {
  if (!resize?.value) return;

  const toResize = resize.value.getElementsByTagName('article');

  if (window.innerWidth >= 1200) {
    scrollWrapperHeight = scrollWrapper.value.offsetHeight;
    scrollWrapperOffsetTop = scrollWrapper.value.getBoundingClientRect().top;

    let maxHeight = 0;
    [...toResize].forEach((e) => {
      e.style.height = ''; // Reset to default value before checking any heights
      if (e.offsetHeight > maxHeight) { // Find the highest height and save it
        maxHeight = e.offsetHeight;
      }
    });
    [...toResize].forEach((e) => { // Set the highest height to the smaller article
      if (maxHeight !== e.offsetHeight) e.style.height = `${maxHeight}px`;
    });
  } else { // Reset to default value when out of the breakpoint
    [...toResize].forEach((e) => {
      e.style.height = '';
    });
  }
}

function changePage(direction) {
  if (
      isChanging ||
      currentSlide + direction === 0 ||
      currentSlide + direction === pagesNumber + 1
  ) return;

  isChanging = true;
  currentSlide += direction;

  main.value.style.transform = `translate3d(0, ${-(currentSlide - 1) * 100}%, 0)`;
  scroller.value.style.transform = `translate3d(-50%, ${((currentSlide - 1) / pagesNumber) * (100 * pagesNumber)}%, 0)`;

  if (currentSlide === 1) { // Nav
    props.cursor.classList.add('bot');
    props.cursor.classList.remove('top');
    prev.value = false;
    next.value = true;
  } else if (currentSlide === pagesNumber) {
    props.cursor.classList.add('top');
    props.cursor.classList.remove('bot');
    next.value = false;
    prev.value = true;
  } else {
    props.cursor.classList.add('top');
    props.cursor.classList.add('bot');
    prev.value = true;
    next.value = true;
  }
}

function scrollerOnMouseDown(e) {
  click = true;
  scrollerStartPos = e.pageY - scroller.value.getBoundingClientRect().top;
  scrollerHeight = scroller.value.offsetHeight;
  main.value.style.transition = 'none';
  scroller.value.style.transition = 'none';

  ['mouseup','mouseout'].forEach(event =>
    scroller.value.addEventListener(event, () => {
      if (!click) return;

      click = false;
      const transitionYValue = main.value.style.transform.split(', ')[1].replace('-', '').replace('%', '');
      main.value.style.transition = '';
      scroller.value.style.transition = '';

      // That way : if result >= 0 && result < 50 it returns page 1, if result >= 50 && result < 150 it returns page 2, etc...
      changePage(Math.round(scrollerResult / 100 + 1) - currentSlide)

      // In case sliding the scrollbar stop on the exact page and doesn't trigger any animation, trigger mainTransitionEnd manually
      if (transitionYValue % 100 === 0) {
        mainTransitionEnd();
      }
    }, { once: true })
  );
}

function scrollerOnMouseMove(e) {
  if (!click) return;

  let offset = e.pageY - scrollWrapperOffsetTop;
  if (offset !== scrollerStartPos) {
    const maxPercentage = pagesNumber * 100 - 100;
    offset -= scrollerStartPos;
    scrollerResult = (offset / scrollWrapperHeight) * 100 * pagesNumber;

    if (scrollerResult <= 0 || offset <= 0) {
      scrollerResult = 0;
      offset = 0;
    } else if (scrollerResult >= maxPercentage || offset >= scrollWrapperHeight - scrollerHeight) {
      scrollerResult = maxPercentage;
      offset = scrollWrapperHeight - scrollerHeight;
    }

    main.value.style.transform = `translate3d(0, -${Math.round(scrollerResult)}%, 0)`;
    scroller.value.style.transform = `translate3d(-50%, ${Math.round(offset)}px, 0)`;
  }
}

function mainTransitionEnd(e) {
  if (e && e.target.tagName !== 'MAIN' && e.propertyName !== 'transform') return;

  isChanging = false;
  sessionStorage.setItem('last_page', currentSlide);
}

onMounted(() => {
  const page = history.state.go_to ?? sessionStorage.getItem('last_page') ?? 1;
  pagesNumber = main.value.children.length;

  onResizeEvent();
  onresize = onResizeEvent;
  main.value.ontransitionend = mainTransitionEnd;

  scroller.value.style.height = `${100 / pagesNumber}%`; // In case I add some page later, set the scroller size dynamically

  main.value.style.transition = 'none';
  scroller.value.style.transition = 'none';
  changePage(page - currentSlide);
  setTimeout(() => {
    main.value.style.transition = '';
    scroller.value.style.transition = '';
    mainTransitionEnd();
  }, 0);
});
</script>

<template>
  <div>
    <main ref="main">
      <section id="about_block">
        <div id="logo">
          <img alt="Anthony Dieudonné logo" src="@/assets/images/logo.svg" width="125" height="125"/>
        </div>
        <div class="container-fluid">
          <div class="row" ref="resize">
            <div class="col-xl-6 bg-primary py-5 py-xl-0 position-relative">
              <div class="h-100 row">
                <article class="col-xl-8 offset-xl-2 my-xl-auto">
                  <h1>Presentation</h1>
                  <p class="mb-0 px-3 px-xl-0">
                    Développeur web full-stack avec une passion pour la création de site web innovant. Je suis à votre disposition pour réaliser vos projets, de la conception au développement, tout en garantissant une expérience utilisateur optimale. Discutons de vos besoins et donnons vie à votre stratégie numérique&nbsp;!
                  </p>
                </article>
              </div>
            </div>
            <div class="col-xl-6 py-5 py-xl-0">
              <div class="h-100 row">
                <article class="col-xl-8 offset-xl-2 my-xl-auto" id="skills">
                  <h1>Stack technique</h1>
                  <p class="mb-0 text-center text-xl-start">
                    <IconSymfony/>
                    <IconWordpress/>
                    <IconVuejs/>
                    <IconBootstrap/>
                    <IconSass/>
                    <IconPhp/>
                    <IconJavascript/>
                    <IconPgsql/>
                    <IconMysql/>
                    <IconGit/>
                    <IconDocker/>
                    <IconLinux/>
                    <IconFigma/>
                    <IconPhotoshop/>
                  </p>
                </article>
              </div>
            </div>
          </div>
          <footer class="row d-xl-flex d-none">
            <div class="col-xl-5 offset-xl-2 d-flex absolute-bottom">
              <ButtonStyle class="bg-light" label="Services" @click="changePage(1)" />
              <ButtonStyle label="Prendre contact" @click="$router.push({ name:'contact' })" />
            </div>
          </footer>
        </div>
      </section>

<!--      <section id="projects_block">-->
<!--        <div class="container-fluid">-->
<!--          <div class="row">-->
<!--            <div class="col-xl-10 offset-xl-1 bg-dark d-flex flex-column py-5 py-xl-0 position-relative">-->
<!--              <div class="mr-xl-n3"><h1 class="text-primary">Projets</h1></div>-->
<!--              <div class="row my-xl-auto px-3 px-xl-0">-->
<!--                <div class="col-xl-10 offset-xl-1">-->
<!--                  carousel-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->

      <section id="services_block">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-8 offset-xl-2 bg-light d-flex flex-column pt-5 pt-xl-0 pb-3 pb-xl-0 position-relative">
              <div class="mr-xl-n3"><h1 class="text-dark">Services</h1></div>
              <div class="row my-xl-auto">
                <article class="col-xl-9 mx-auto bg-fav position-relative">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <h2>Développement<span class="d-xl-block no-cursor-change"> Back&#8209;end</span></h2>
                    </li>
                    <li>
                      <h2>Développement <span class="d-xl-block no-cursor-change">Front&#8209;end</span></h2>
                    </li>
                    <li><h2>Web design</h2></li>
                    <li><h2>UX design</h2></li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact_block" class="position-relative">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-9 bg-primary py-5 py-xl-0 h-100 d-flex flex-column">
              <div class="row my-xl-auto">
                <article class="col-xl-10 offset-xl-1">
                  <div class="row px-3 px-xl-0">
                    <div class="col-md-6 mb-4 mb-md-0 text-center text-md-start">
                      <h1>
                        Un projet en tête&nbsp;? <span class="d-block">Allons prendre un café.</span>
                      </h1>
                    </div>
                    <div class="col-md-6 d-flex align-items-center">
                      <ButtonStyle class="bg-white" label="Prendre contact" @click="$router.push({ name:'contact' })" />
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
        <footer class="text-center bg-white">
          <div class="h-100 d-flex position-relative">
            <a
              class="m-auto text-decoration-none stretched-link py-3"
              href="https://www.linkedin.com/in/anthony-dieudonne/"
              target="_blank"
              rel="noopener"
            >Linked In</a>
          </div>
        </footer>
      </section>
    </main>

    <aside class="d-none d-xl-flex">
      <div id="scroll-wrapper" ref="scrollWrapper">
        <div id="scroll-bar"></div>
        <span id="scroll-er" ref="scroller" @mousedown="scrollerOnMouseDown" @mousemove="scrollerOnMouseMove"></span>
      </div>
    </aside>

    <nav class="d-none d-xl-block">
      <Transition name="fadeUp">
        <button id="prev" aria-label="Précédent" @click="changePage(- 1)" v-show="prev">
          <svg width="48" height="48" viewBox="0 0 1024 1024">
            <path d="M890.596 674.892L525.464 322.276c-1.233-1.138-2.56-2.086-3.983-2.94a18.946 18.946 0 00-22.945 2.56L133.404 674.607c-7.68 7.396-7.774 19.817 0 27.307 7.396 7.206 19.343 6.827 26.738-.38l351.763-339.626H512l352.047 340.006c7.396 7.206 19.343 7.49 26.738.38 7.585-7.586 7.49-20.007-.19-27.402z"/>
          </svg>
        </button>
      </Transition>
      <Transition name="fadeDown">
        <button id="next" aria-label="Suivant" @click="changePage(1)" v-show="next">
          <svg width="48" height="48" fill="none" viewBox="0 0 1024 1024">
            <path fill="#000" d="M890.596 349.108 525.464 701.724c-1.233 1.138-2.56 2.086-3.983 2.94a18.945 18.945 0 0 1-22.945-2.56L133.404 349.393c-7.68-7.396-7.774-19.817 0-27.307 7.396-7.206 19.343-6.827 26.738.38l351.763 339.626H512l352.047-340.006c7.396-7.206 19.343-7.49 26.738-.38 7.585 7.586 7.49 20.007-.19 27.402h.001Z"/>
          </svg>
        </button>
      </Transition>
    </nav>
  </div>
</template>
