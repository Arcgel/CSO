<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref<string>('');
const password = ref<string>('');
const email = ref<string>('');
const verificationtoken = ref<string>('');
const generatedCode = ref<string>('');

const generatedverificationtoken = () => {
  generatedCode.value = Math.floor(10000 + Math.random() * 999999).toString();
  localStorage.setItem('verificationtoken', generatedCode.value);
  alert(`Your verification code: ${generatedCode.value}`);
}

const handleRegister = async () => {
  const verificationToken: string | null = localStorage.getItem('verificationtoken');
  if(!verificationToken || verificationtoken.value !== verificationToken){
    alert('Its you who is in the wrong');
    return;
  }

 if(!name.value.trim() || !email.value.trim() || !password.value.trim() || !verificationtoken.value.trim()){
  alert("All Field are required");
  return;
 }

 if(password.value.length < 6){
  alert("Password must be longer than six");
  return;
 }

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if(!emailRegex.test(email.value)){
  alert('Invalid Email');
  return;
 }

  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
    verificationtoken: verificationtoken.value
  }

  localStorage.setItem('user', JSON.stringify(userData));
  router.push('/');
  alert("Registered Successfully")
}


</script>

<template>
  <div class="container-fluid login-body">
    <div class="bg-primary p-5 w-50 container-custom">
      <form @submit.prevent="handleRegister">
        <div>
          <i class="fa-solid fa-user icon-relative"></i>
          <input type="text" v-model="name" class="form-control ps-5 input-radius" id="nameInput" required />
        </div>
        <div>
          <i class="fa-solid fa-lock icon-relative"></i>
          <input
            type="password"
            class="form-control ps-5 input-radius"
            v-model="password"
            id="passwordInput"
            required
          />
        </div>
        <div>
          <i class="fa-solid fa-envelope icon-relative"></i>
          <input
            type="email"
            class="form-control ps-5 input-radius"
            v-model="email"
            id="exampleInputEmail"
            required
          />
        </div>
        <div>
          <i class="fa-solid fa-envelope-open icon-relative"></i>
          <div class="d-flex flex-column flex-md-row gap-2">
            <input
              type="text"
              class="form-control ps-5 input-radius custom-width"
              v-model="verificationtoken"
              id="verificationInput"
              required
            />
            <button type="button" class="btn custom-btn fw-bold" :onclick="generatedverificationtoken">Verification Code</button>
          </div>
        </div>
        <div class="mt-2 mb-2">
          <span>Don’t have an account? <router-link to="/">Log in</router-link></span>
        </div>
        <div class="text-center">
          <button type="submit" class="btn custom-btn fw-bold">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-body {
  height: 100%;
  position: absolute;
  align-content: center;
}
.container-custom {
  justify-self: center;
  border-radius: 20px;
  box-shadow: 0px 15px 15px 10px #0000008c;
  width: 35% !important;
  background-color: #00000066 !important;
}

.custom-btn {
  width: 177px;
  height: 41px;
  border-radius: 15px;
  background-color: #d9d9d9;
  color: black;
}
.input-radius {
  border-radius: 15px;
}
.custom-width {
  width: 62%;
}
</style>
