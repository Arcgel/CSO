<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref<string>('');
const password = ref<string>('');

const loggingin = async() => {
  const storedusers: string | null = localStorage.getItem('user')

  if(!storedusers){
    alert('No Account found, Please create one');
    return;
  }

  const userData: { email: string; password: string } = JSON.parse(storedusers);
  if(email.value !== userData.email || password.value !== userData.password){
    alert('Does not match any users');
    return;
  }

  alert('login succesfully')
  router.push('/dashboard');

}
</script>

<template>
  <div class="container-fluid login-body">
    <div class="bg-primary p-5 container-custom">
      <form @submit.prevent="loggingin">
        <div class="mb-3">
          <i class="fa-solid fa-envelope icon-relative"></i>
          <input
            type="email"
            class="form-control ps-5 input-radius"
            v-model="email"
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-3">
          <i class="fa-solid fa-lock icon-relative"></i>
          <input
            type="password"
            class="form-control ps-5 input-radius"
            v-model="password"
            id="passwordInput"
            placeholder="Password"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Show password</label>
        </div>
        <div class="mt-2 mb-2">
          <span>Create new account ? <router-link to="/Register">Register</router-link></span>
        </div>
        <div class="text-center">
          <button type="submit" class="btn custom-btn fw-bold">Login</button>
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
  background-image: url('/image/wallpapersden.com_minimal-reflection-sunset_1920x1080.jpg');
  background-size: cover;
}

.input-radius {
  border-radius: 15px;
}
</style>
