<script setup lang="ts">

</script>

<template>
   <div class="container-fluid login-body">
     <div class="bg-primary p-5 w-50 container-custom">
         <form>
                <div>
                   <i class="fa-solid fa-user icon-relative"></i>
                   <input type="text" class="form-control ps-5 input-radius" id="nameInput" required>
                </div>
                <div>
                   <i class="fa-solid fa-lock icon-relative"></i>
                   <input type="password" class="form-control ps-5 input-radius" id="passwordInput"  required>
                </div>
                <div>
                   <i class="fa-solid fa-envelope icon-relative"></i>
                   <input type="email" class="form-control ps-5 input-radius" id="exampleInputEmail" required>
                </div>
                <div>
                   <i class="fa-solid fa-envelope-open icon-relative"></i>
                   <div class="d-flex flex-column flex-md-row gap-2">
                    <input type="text" class="form-control ps-5 input-radius custom-width" id="verificationInput" required>
                    <button type="submit" class="btn custom-btn fw-bold">Verification Code</button>
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
.custom-width{
  width: 62%;
}
</style>
