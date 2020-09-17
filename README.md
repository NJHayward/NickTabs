# NickTabs
Easy to use and configure jQuery tabs 

# Usage 

```html
<div id="nickTabsElmPreload">
    <div nicktabs-title="Tab 1">
        This is tab number 1
    </div>
    <div nicktabs-title="Tab 2">
        This is tab number 2
    </div>
    <div nicktabs-title="Tab 3">
        This is tab number 3
    </div>
    <div nicktabs-title="Tab 4">
        This is tab number 4
    </div>
</div>
```

```jsx
$(document).ready(function () {
    /* setup preloaded tabs */
    var jsTabs = $("#nickTabsElmPreload").nickTabs({ TabContentHeight: "500px" });
});
```

# Config Options

| option | type | default | description |
| --- | --- | --- | --- |
|TabContentHeight|string|auto|Size of the tab content.  Any overflow will scroll unless set to auto where it will match the height of the content|


# Javascript extras

```jsx
//add a tab
jsTabs = jsTabs.addTab("New Tab", "<br />This is new tab<br />");

//remove a tab
jsTabs = jsTabs.removeTab(0);  //remove tab based on index of tab
```
