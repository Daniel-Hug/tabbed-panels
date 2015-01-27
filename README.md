tabbed-panels
=============

A declarative tabbed panels JS module

 - lightweight
 - no dependencies
 - no exports

## Use

1. Include **panels.js** and **panels.css**.

2. Wrap the tabs/buttons and their panels in a `.tabbed-panels` wrapper, and add a class of "**tab**" to each tab and "**panel**" to each panel:

    ```html
    <div class="tabbed-panels">
        <!-- Tabs -->
        <button class="tab">Tab 1</button>
        <button class="tab">Tab 2</button>

        <!-- Panels -->
        <div class="panel">
            <h1>Panel 1</h1>
        </div>
        <div class="panel">
            <h1>Panel 2</h1>
        </div>
    </div>
    ```

## Options

 - To make panels closeable add a "**closeable**" class to the `.tabbed-panels` wrapper.
 - To make panels hover over other page content add a "**hovering**" class to the `.tabbed-panels` wrapper. Combining the closeable and hovering classes will make the panels close when you click elsewhere on the page.

## Browser support
Requires `getElementsByClassName`, `classList`, `forEach`, and `filter`.
