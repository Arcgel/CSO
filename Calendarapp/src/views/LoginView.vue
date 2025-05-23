<script setup lang="ts">

</script>

<template>
   <div class="container-fluid login-body">
     <div class="bg-primary p-5 w-50 container-custom">
         <form>
                <div class="mb-3">
                   <i class="fa-solid fa-envelope icon-relative"></i>
                   <input type="email" class="form-control ps-5 input-radius" id="emailInput" aria-describedby="emailHelp" required>
                </div>
                <div class="mb-3">
                   <i class="fa-solid fa-lock icon-relative"></i>
                   <input type="password" class="form-control ps-5 input-radius" id="passwordInput" aria-describedby="emailHelp" required>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Show password</label>
                </div>
                 <div class="mt-2 mb-2">
                     <span>Don’t have an account? <router-link to="/Register">Register</router-link></span>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn custom-btn fw-bold">Login</button>
                </div>
            </form>
     </div>
   </div>
</template>

<style scoped>
.login-body{
    height: 100%;
    position: absolute;
    align-content: center;
}
.container-custom{
    justify-self: center;
    border-radius: 20px;
    box-shadow: 0px 15px 15px 10px #0000008c;
    width: 35% !important;
    background-color: #00000066 !important;
}

.custom-btn{
    width: 177px;
    height: 41px;
    border-radius: 15px;
    background-color: #D9D9D9;
    color: black;
}
.input-radius{
     border-radius: 15px;
}
</style>