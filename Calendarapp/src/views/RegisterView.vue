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
  if (!verificationToken || verificationtoken.value !== verificationToken) {
    alert('Its you who is in the wrong');
    return;
  }

  if (!name.value.trim() || !email.value.trim() || !password.value.trim() || !verificationtoken.value.trim()) {
    alert("All Field are required");
    return;
  }

  if (password.value.length < 6) {
    alert("Password must be longer than six");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
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
    <div class="bg-primary p-5 container-custom">
      <form @submit.prevent="handleRegister">
        <h3 class="text-center text-white mb-3 fw-bold">Register</h3>
        <div>
          <i class="fa-solid fa-user icon-relative"></i>
          <input type="text" v-model="name" class="form-control ps-5 input-radius" id="nameInput" placeholder="User"
            required />
        </div>
        <div>
          <i class="fa-solid fa-lock icon-relative"></i>
          <input type="password" class="form-control ps-5 input-radius" v-model="password" id="passwordInput"
            placeholder="Password" required />
        </div>
        <div>
          <i class="fa-solid fa-envelope icon-relative"></i>
          <input type="email" class="form-control ps-5 input-radius" v-model="email" id="exampleInputEmail"
            placeholder="Email" required />
        </div>
        <div>
          <i class="fa-solid fa-envelope-open icon-relative"></i>
          <div class="d-flex flex-column flex-md-row gap-2 ">
            <input type="text" class="form-control ps-5 input-radius custom-width" v-model="verificationtoken"
              id="verificationInput" placeholder="Code" required />
            <button type="button" class="btn custom-btn fw-bold verification-btn"
              :onclick="generatedverificationtoken">Verification Code</button>
          </div>
        </div>
        <div class="mt-3 mb-2">
          <span>Already have an account? <router-link to="/">Log in</router-link></span>
        </div>
        <div class="text-center">
          <button type="submit" class="btn register custom-btn fw-bold">Register</button>
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

.custom-width {
  width: 62%;
}

.fa-solid {
  color: #3c445b;
}

a {
  text-decoration: none;
  color: #ee8c73;
  font-weight: 600;
}

span {
  color: white;
}


.btn .custom-btn .fw-bold {
  display: block
}

button.btn {
  color: #3c445b;
}



button.btn.register {
  margin-top: 20px;
}

.form-check-label {
  color: white;
}

@media (min-width: 320px) and (max-width: 767px) {
  .container-custom {
    min-width: 100vw;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    font-size: 1.8rem;
  }

  form {
    width: 90%;
  }

  .form-control {
    padding: 10px;
  }

  .icon-relative {
    top: 37px
  }

  #verificationInput {
    width: 100%;
  }

  .verification-btn {
    min-width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }


}

@media (min-width: 768px) and (max-width: 1305px) {
  .container-custom {
    min-width: 450px
  }
}
</style>
