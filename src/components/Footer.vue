<template>
    <footer title="Tap the footer to fold or unfold">
        <input type="checkbox" id="expandable"/>
        <label class="wrapper" for="expandable">
            <div class="paragraph">
                <p class="foldeable main-text"><b>Thanks for visiting the site!</b></p>
                <p class="main-text -small">Made with ❤️ in Nombre de Dios, Dgo.</p>
                <p class="foldeable main-text -small">If you want to find me elsewhere on the web, here’s where I hang out.</p>
            </div>
            <div class="foldeable net-icons">
                <a class="net-icon" href="https://www.instagram.com/gazaelofficial/" target="_blank"><img src="/assets/images/icons/instagram.png" alt="instagram picture"></a>
                <a href="https://twitter.com/azaelfernandez" target="_blank" class="net-icon"><img src="/assets/images/icons/twitter.webp" alt="twitter picture"></a>
                <a class="net-icon" href="https://www.linkedin.com/in/gelacio-azael-f-a3694681" target="_blank"><img src="/assets/images/icons/linkedin.png" alt="linkedin picture"></a>
                <a href="https://open.spotify.com/user/1224585085?si=1_dzSXyqQ-ikeAGb2biZxg" target="_blank" class="net-icon"><img src="/assets/images/icons/spotify.png" alt="spotify picture"></a>
                <a class="net-icon" href="https://medium.com/@gazaelfernandez" target="_blank"><img src="/assets/images/icons/medium.png" alt="medium picture"></a>
            </div>
            <div class="foldeable net-icons">
                <a class="net-icon" href="https://github.com/kasec" target="_blank"><img src="/assets/images/icons/github.svg" alt="github picture"></a>
                <a class="net-icon" href="https://gitlab.com/galfan" target="_blank"><img src="/assets/images/icons/gitlab.webp" alt="gitlab picture"></a>
            </div>
            <p class="main-text -small">© 2021-present Gelacio Azael Fernandez Aldava. All Rights Reserved.</p>
        </label>
    </footer>
</template>
<style lang="postcss" scoped>

footer {
   background-color: rgb(31, 31, 31);
}

footer > .wrapper {
    display: flex;
    padding: .5em 2rem;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
}

footer > .wrapper {
    color: #f5f5f5;
	box-sizing: border-box;
	width: 100%;
    text-align: left;
    cursor: pointer;
}

footer > .wrapper > .header {
    margin: .5rem 0;
}
footer > .wrapper > .footer {
    margin: .5rem 0;
}
footer > .wrapper  .main-text {
    margin: .2rem 0;
}

footer > .wrapper > .net-icons {
    @apply flex flex-row my-5
}
footer > .wrapper > .net-icons > .net-icon {
    @apply mx-1 p-1 bg-blue-50 rounded-sm hover:bg-green-300
}
footer > .wrapper > .net-icons > .net-icon > img {
     @apply w-10 h-10;
}
#expandable {
    display: none;
}
footer > .wrapper .foldeable {
    display: none;
}
#expandable:checked + .wrapper .foldeable {
    display: inherit
}

@media only screen and (max-width: 852px) {
    footer > .wrapper > .header {
        margin: .5rem 0 0 0;
    }
    footer > .wrapper > .footer {
        margin: 0 0 .5rem 0;
    }
}
</style>