/*
 *  Created by Nick Hayward
 */
(function ($) {
    $.fn.nickTabs = function (settings) {
        //props
        var thisObj = null;
        var baseForId = null;
        var TabCount = 0;
        var NextTabId = 0;
        var PrevSelectedTabId = null;
        var SelectedTabId = null;

        //config
        var defaultTabContentHeight = null;
        var config = { TabContentHeight: defaultTabContentHeight };

        //initialise config
        if (settings) $.extend(true, config, settings);
        CheckConfig();

        //init vars
        thisObj = jQuery(this);
        baseForId = thisObj.attr("id") + "-nicktabs";

        //setup tabs
        return SetupTabs();

        function CheckConfig() {
            //check StartTimeout is a number
            if (config.TabContentHeight !== null && typeof config.TabContentHeight !== "string") {
                config.TabContentHeight = defaultTabContentHeight;
            }
        }

        function SetupTabs() {
            //get children objects
            var contents = [];
            var titles = []
            thisObj.children("div").each(function () {
                contents.push(jQuery(this).html());
                titles.push(jQuery(this).attr("nicktabs-title"));
                jQuery(this).remove();
            });

            //add parent class to passed in object
            thisObj.append("<div id=\"" + baseForId + "\" class=\"nicktabs-parent\"></div>");
            var tabElement = jQuery("#" + baseForId);

            //create titles
            tabElement.append("<div id=\"" + baseForId + "-hdrs\" class=\"nickTabHeaders\"></div>");
            tabElement.append("<div id=\"" + baseForId + "-conts\" class=\"nickTabContents\"></div>");
            tabElement.append("<input type=\"hidden\" id=\"" + baseForId + "-maxTabId\" name=\"" + baseForId + "-maxTabId\" value=\"0\" />")

            //add tabs from content
            for (var i = 0; i < contents.length; i++) {
                //if this is the first tab add the selected class
                addTabPriv(titles[i], contents[i]);
            }

            //select first tab
            SelectTab(0);

            return getOutput();
        }

        function addTabPriv(title, content) {
            addHeader(title);
            addContent(content);
            jQuery("#" + baseForId + "-maxTabId").val(NextTabId);
            TabCount++;
            NextTabId++;

            function addHeader(title) {
                //increment html to var
                jQuery("#" + baseForId + "-hdrs").append("<div id=\"" + baseForId + "-hdr-" + NextTabId + "\" nicktab-rowNum=\"" + NextTabId + "\" class=\"nickTabHeader\">" + ((title === null || title.trim() === "") ? "&nbsp;" : title) + "</div>");
                jQuery("#" + baseForId + "-hdr-" + NextTabId).click(doHeaderClick);
            }

            function addContent(content) {
                //if we have specified height..assign the css
                var extraClass = "";
                var extraTag = "";
                if (config.TabContentHeight !== null) {
                    extraClass = "nickTabContentWithHeight";
                    extraTag = "style=\"height: " + config.TabContentHeight + ";\" ";
                }

                //increment html to var
                jQuery("#" + baseForId + "-conts").append("<div id=\"" + baseForId + "-cont-" + NextTabId + "\" class=\"nickTabContent " + extraClass + "\" " + extraTag + "><input type=\"hidden\" id=\"" + baseForId + "-isPresent-" + NextTabId + "\" name=\"" + baseForId + "-isPresent-" + NextTabId + "\" value=\"true\" />" + content + "</div>");
            }
        }

        function addTabPublic(title, content) {
            //remove selected css
            removeSelected();

            //is content an id? or html?
            var contentToAdd = content;
            if (content.substring(0, 1) === "#") {
                contentToAdd = jQuery(content).html();
                jQuery(content).remove();
            }

            //add tab as the selected one
            var newTabId = NextTabId.valueOf();
            addTabPriv(title, contentToAdd);
            SelectTab(newTabId);
            return getOutput();
        }

        function removeTab(tabId) {
            jQuery("#" + baseForId + "-hdr-" + tabId).remove();
            jQuery("#" + baseForId + "-cont-" + tabId).remove();
            TabCount--;

            //if tab has been removed return to previously selected tab.  if there is no previously selected tab return to the first one
            var returnTabId = PrevSelectedTabId;
            if (PrevSelectedTabId === null) {
                var firstTab = jQuery("#" + baseForId + "-hdrs").children().first();
                returnTabId = jQuery(firstTab).attr("nicktab-rowNum");
            }
            else {
                PrevSelectedTabId = null; //previous we will now select so make it null as the new previous has been removed
            }
            SelectTab(returnTabId);
            return getOutput();
        }

        function doHeaderClick() {
            //get row id
            var rowId = jQuery(this).attr("nicktab-rowNum");

            //select the tab
            removeSelected();
            SelectTab(rowId);
        }

        function removeSelected() {
            //remove existing selected classes
            jQuery("#" + thisObj.attr("id") + " .nickTabHeader-selected").removeClass("nickTabHeader-selected");
            jQuery("#" + thisObj.attr("id") + " .nickTabContent-selected").removeClass("nickTabContent-selected");
            PrevSelectedTabId = SelectedTabId;
        }

        function SelectTab(rowId) {
            //add new selected classes
            jQuery("#" + baseForId + "-hdr-" + rowId).addClass("nickTabHeader-selected");
            jQuery("#" + baseForId + "-cont-" + rowId).addClass("nickTabContent-selected");

            //updated slectedTabId
            SelectedTabId = rowId.valueOf();
        }

        function getOutput() {
            return {
                addTab: addTabPublic,
                removeTab: removeTab,
                NextTabId: NextTabId.valueOf(),
                SelectedTabId: SelectedTabId.valueOf(),
                TabCount: TabCount.valueOf()
            };
        }
    };
}(jQuery));