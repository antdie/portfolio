<script setup>
import {onMounted, ref} from "vue";
import ButtonStyle from "@/components/ButtonStyle.vue";

const props = defineProps(['cursor']);
const message = ref();
const alert = ref();
const alertTrigger = ref(false);

function messageKeyDown() {
  setTimeout(() => {
    message.value.style.height = `${message.value.scrollHeight}px`
  }, 0)
}

function formSubmit(e) {
  console.log(e.target.name.value);

  if (!e.target.name.value || !e.target.message.value || !e.target.email.value) {
    !e.target.name.value ? e.target.name.classList.add('form-error') : e.target.name.classList.remove('form-error');
    !e.target.message.value ? e.target.message.classList.add('form-error') : e.target.message.classList.remove('form-error');
    !e.target.email.value ? e.target.email.classList.add('form-error') : e.target.email.classList.remove('form-error');

    return;
  }

  const myForm = e.target;
  const formData = new FormData(myForm);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      alertTrigger.value = true;
      alert.value.classList.add('alert-success');
      alert.value.innerText = 'Votre message a été envoyé avec succès, je vous répondrais dans le plus bref délais.';
    })
    .catch(() => {
      alertTrigger.value = true;
      alert.value.classList.add('alert-danger');
      alert.value.innerHTML = 'Boite de réception pleine, veuillez me contacter sur <a href="https://www.linkedin.com/in/anthony-dieudonne/" target="_blank" rel="noopener" class="text-dark">Linkedin</a>.';
    });
}

onMounted(() => {
  props.cursor.classList.remove('top');
  props.cursor.classList.remove('bot');
});
</script>

<template>
  <div class="m-auto">
    <form
      data-netlify="true"
      method="POST"
      name="contact"
      netlify-honeypot="username"
      @submit.prevent="formSubmit"
      v-if="!alertTrigger"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p class="username-field"><input autocomplete="off" name="username" type="text" tabindex="-1" /></p>
      <p>Bonjour Anthony,</p>
      <p>
        Je m'appelle <span><input name="name" placeholder="Nomen Nescio" type="text" /></span>
      </p>
      <p class="d-flex">
        <textarea
          class="w-100"
          name="message"
          placeholder="Je souhaite vous contacter pour..."
          rows="4"
          ref="message"
          @keydown="messageKeyDown"
        ></textarea>
      </p>
      <p>
        Vous pouvez m'envoyer un courriel à <span><input name="email" placeholder="Email" type="email" /></span>
      </p>
      <div class="text-md-end">
        <ButtonStyle label="Envoyer" type="submit" class="mini" />
      </div>
    </form>
    <Transition name="fade">
      <div class="alert" role="alert" ref="alert" v-show="alertTrigger"></div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_custom.scss";

form {
  overflow-y: auto;
  padding: 2rem;
  margin: 6px 0;
  color: $white;
  z-index: 1;

  p {
    margin-bottom: 2rem;
  }
  .username-field {
    display: none;
  }
  input,
  textarea {
    background: none;
    border: 0;
    color: #fff;
    padding: 0;
  }
  input {
    border-bottom: 1px solid $white;
    width: auto;
    max-width: 240px;
  }
  textarea {
    resize: none;
    overflow: hidden;
    background: repeating-linear-gradient(0, $white, $white 1px, transparent 1px, transparent 38px);
    line-height: 38px;
    margin-bottom: .5rem;
  }
  input::placeholder,
  textarea::placeholder {
    color: $white;
  }
  a:focus,
  input:focus,
  textarea:focus,
  button:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  input.form-error {
    border-color: #dc3545;
  }
  textarea.form-error {
    background: repeating-linear-gradient(0, #dc3545, #dc3545 1px, transparent 1px, transparent 38px);
  }
}
.alert {
  margin: 0 2.5rem;
  text-align: center;
}
</style>
