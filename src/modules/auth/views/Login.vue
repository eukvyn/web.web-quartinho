<template>
    <header class="p-3 mb-3 border-bottom">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
                <a href="/" class="d-flex align-items-center me-2 link-body-emphasis text-decoration-none">
                    <i class="bi bi-house fs-2 text-center" width="40" height="32"></i>
                </a>

                <!-- <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="#" class="nav-link px-2 link-secondary">Overview</a></li>
                    <li><a href="#" class="nav-link px-2 link-body-emphasis">Inventory</a></li>
                    <li><a href="#" class="nav-link px-2 link-body-emphasis">Customers</a></li>
                    <li><a href="#" class="nav-link px-2 link-body-emphasis">Products</a></li>
                </ul> -->

                <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
                </form> -->
                <div class="text-end">
                    <button type="button" class="btn btn-primary me-2">Login</button>
                    <button type="button" class="btn btn-secondary">Sign-up</button>
                </div>

                <!-- <div class="dropdown text-end">
                    <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
                    </a>
                    <ul class="dropdown-menu text-small" style="">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div> -->
            </div>
        </div>
    </header>
    <main class="d-flex align-items-center py-4 bg-body-tertiary">
        <div class="form-signin h-100-vh m-auto">
            <form>
                <!-- <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                <i class="bi bi-bag-fill"></i>
                <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                    <kpm-field-badge type="default" loading="false" menu-type="login"
                        class="kpm_input-field-button kpm_gray-key-icon" style="z-index: 20 !important;"></kpm-field-badge>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                    <kpm-field-badge type="default" loading="false" menu-type="login"
                        class="kpm_input-field-button kpm_gray-key-icon" style="z-index: 20 !important;"></kpm-field-badge>
                </div>

                <div class="form-check text-start my-3">
                    <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    name: 'LoginAuth',
}
</script>

<style>
main {
    height: 100vh !important;
}
</style>