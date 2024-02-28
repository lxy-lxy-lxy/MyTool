<script>
    import Router, {link} from "svelte-spa-router";
    import {routes, sideMenus} from "../routes.js";

    let currentPath
    let isActive = false
    getLocation()

    function getLocation() {
        currentPath = location.hash
    }

    function getElements() {
        return {
            layout: document.getElementById('layout'),
            menu: document.getElementById('menu'),
            menuLink: document.getElementById('menuLink')
        };
    }

    function handleEvent(e) {
        let elements = getElements();

        if (e.target.id === elements.menuLink.id) {
            isActive = true
            e.preventDefault();
        } else if (elements.menu.className.indexOf('active') !== -1) {
            isActive = false
        }
    }

    document.addEventListener("click", handleEvent)
</script>

<div id="layout" class={isActive ? "active" : ""}>
    <!-- Menu toggle -->
    <a href="#menu" id="menuLink" class={`menu-link ${isActive ? "active" : ""}`}>
        <span></span>
    </a>

    <div id="menu" class={isActive ? "active" : ""}>
        <div class="pure-menu">
            <a class="pure-menu-heading" href="/" use:link on:click={getLocation}>
                <h3>工具</h3>
            </a>

            <!--            <Router {routes}/>-->
            <ul class="pure-menu-list">
                {#each sideMenus as sideMenu, i}
                    <li class="pure-menu-item">
                        <a href={`#${sideMenu.path}`}
                           on:click={getLocation}
                           class={`pure-menu-link ${currentPath === `#${sideMenu.path}` ? "menu-item-divided pure-menu-selected" : ""}`}>
                            {sideMenu.name}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    <div id="main">
        <div class="content">
            <Router {routes}/>
        </div>
    </div>
</div>

<style>
    /*
    Add transition to containers so they can push in and out.
    */
    #layout,
    #menu,
    .menu-link {
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        -ms-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
    }

    /*
    This is the parent `<div>` that contains the menu and the content area.
    */
    #layout {
        position: relative;
        left: 0;
        padding-left: 0;
    }

    #layout.active #menu {
        left: 200px;
        width: 200px;
    }

    #layout.active .menu-link {
        left: 200px;
    }

    /*
    The content `<div>` is where all your content goes.
    */
    .content {
        margin: 0 auto;
        padding: 0 2em;
        max-width: 1600px;
        margin-bottom: 50px;
        line-height: 1.6em;
    }

    /*
    The `#menu` `<div>` is the parent `<div>` that contains the `.pure-menu` that
    appears on the left side of the page.
    */

    #menu {
        margin-left: -200px; /* "#menu" width */
        width: 200px;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1000; /* so the menu or its navicon stays above all content */
        background: #191818;
        overflow-y: auto;
    }

    /*
    All anchors inside the menu should be styled like this.
    */
    #menu a {
        color: #999;
        border: none;
        padding: 0.6em 0 0.6em 0.6em;
    }

    /*
    Remove all background/borders, since we are applying them to #menu.
    */
    #menu .pure-menu,
    #menu .pure-menu ul {
        border: none;
        background: transparent;
    }

    /*
    Add that light border to separate items into groups.
    */
    #menu .pure-menu ul,
    #menu .pure-menu .menu-item-divided {
        border-top: 1px solid #333;
    }

    /*
    Change color of the anchor links on hover/focus.
    */
    #menu .pure-menu li a:hover,
    #menu .pure-menu li a:focus {
        background: #333;
    }

    /*
    This styles the selected menu item `<li>`.
    */
    #menu .pure-menu-selected {
        background: #333333;
    }

    /*
    This styles a link within a selected menu item `<li>`.
    */
    #menu .pure-menu-selected a {
        color: #fff;
    }

    /*
    This styles the menu heading.
    */
    #menu .pure-menu-heading {
        font-size: 110%;
        color: #fff;
        margin: 0;
        border-bottom: 1px solid #333333;
    }

    /* -- Dynamic Button For Responsive Menu -------------------------------------*/

    /*
    The button to open/close the Menu is custom-made and not part of Pure. Here's
    how it works:
    */

    /*
    `.menu-link` represents the responsive menu toggle that shows/hides on
    small screens.
    */
    .menu-link {
        position: fixed;
        display: block; /* show this only on small screens */
        top: 0;
        left: 0; /* "#menu width" */
        background: #000;
        background: rgba(0, 0, 0, 0.7);
        font-size: 10px; /* change this value to increase/decrease button size */
        z-index: 10;
        width: 2em;
        height: auto;
        padding: 2.1em 1.6em;
    }

    .menu-link:hover,
    .menu-link:focus {
        background: #000;
    }

    .menu-link span {
        position: relative;
        display: block;
    }

    .menu-link span,
    .menu-link span:before,
    .menu-link span:after {
        background-color: #fff;
        pointer-events: none;
        width: 100%;
        height: 0.2em;
    }

    .menu-link span:before,
    .menu-link span:after {
        position: absolute;
        margin-top: -0.6em;
        content: " ";
    }

    .menu-link span:after {
        margin-top: 0.6em;
    }


    /* -- Responsive Styles (Media Queries) ------------------------------------- */

    /*
    Hides the menu at `48em`, but modify this based on your app's needs.
    */
    @media (min-width: 48em) {
        .content {
            padding-left: 2em;
            padding-right: 2em;
        }

        #layout {
            padding-left: 200px; /* left col width "#menu" */
            left: 0;
        }

        #menu {
            left: 200px;
        }

        .menu-link {
            position: fixed;
            left: 200px;
            display: none;
        }

        #layout.active .menu-link {
            left: 200px;
        }
    }

    @media (max-width: 48em) {
        /* Only apply this when the window is small. Otherwise, the following
        case results in extra padding on the left:
            * Make the window small.
            * Tap the menu to trigger the active state.
            * Make the window large again.
        */
        #layout.active {
            position: relative;
            left: 200px;
        }
    }
</style>